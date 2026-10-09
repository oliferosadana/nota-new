/**
 * ESC/POS Binary Command Generator & Hardware Direct Communication (Web Bluetooth & Web Serial)
 */

export class EscPosBuilder {
  constructor(paperWidth = '58mm') {
    this.buffer = [];
    this.paperWidth = paperWidth;
    this.maxChars = paperWidth === '80mm' ? 48 : 32;
    this.init();
  }

  init() {
    this.buffer.push(0x1B, 0x40);
    return this;
  }

  align(alignment) {
    let val = 0;
    if (alignment === 'center' || alignment === 'C') val = 1;
    if (alignment === 'right' || alignment === 'R') val = 2;
    this.buffer.push(0x1B, 0x61, val);
    return this;
  }

  bold(enable = true) {
    this.buffer.push(0x1B, 0x45, enable ? 1 : 0);
    return this;
  }

  size(widthMultiplier = 1, heightMultiplier = 1) {
    const w = Math.min(Math.max(widthMultiplier - 1, 0), 7);
    const h = Math.min(Math.max(heightMultiplier - 1, 0), 7);
    const n = (w << 4) | h;
    this.buffer.push(0x1D, 0x21, n);
    return this;
  }

  text(str) {
    if (!str) return this;
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    for (let b of bytes) {
      this.buffer.push(b);
    }
    return this;
  }

  line(str = '') {
    this.text(str);
    this.buffer.push(0x0A);
    return this;
  }

  feed(lines = 1) {
    for (let i = 0; i < lines; i++) {
      this.buffer.push(0x0A);
    }
    return this;
  }

  divider(char = '-') {
    const dividerStr = char.repeat(this.maxChars);
    this.align('center');
    this.line(dividerStr);
    return this;
  }

  doubleDivider() {
    return this.divider('=');
  }

  twoColumns(left, right) {
    left = String(left || '');
    right = String(right || '');
    const spaceCount = this.maxChars - left.length - right.length;
    if (spaceCount < 1) {
      const available = this.maxChars - right.length - 1;
      left = left.substring(0, Math.max(available, 0));
    }
    const finalSpaces = Math.max(1, this.maxChars - left.length - right.length);
    const row = left + ' '.repeat(finalSpaces) + right;
    this.align('left');
    this.line(row);
    return this;
  }

  itemRow(name, qty, price, total) {
    this.align('left');
    this.line(name);
    const qtyPrice = `  ${qty} x ${price}`;
    this.twoColumns(qtyPrice, total);
    return this;
  }

  cut() {
    this.feed(3);
    this.buffer.push(0x1D, 0x56, 0x41, 0x00);
    return this;
  }

  openCashDrawer() {
    this.buffer.push(0x1B, 0x70, 0x00, 0x19, 0xFA);
    return this;
  }

  getUint8Array() {
    return new Uint8Array(this.buffer);
  }
}

export const ThermalPrinterDevice = {
  bluetoothDevice: null,
  bluetoothCharacteristic: null,
  serialPort: null,

  isBluetoothSupported() {
    return typeof navigator !== 'undefined' && 'bluetooth' in navigator;
  },

  isSerialSupported() {
    return typeof navigator !== 'undefined' && 'serial' in navigator;
  },

  async connectBluetooth() {
    if (!this.isBluetoothSupported()) {
      throw new Error("Web Bluetooth tidak didukung di browser ini. Silakan gunakan Google Chrome / Edge.");
    }

    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: ['000018f0-0000-1000-8000-00805f9b34fb'] },
          { services: ['e7810a71-73ae-499d-8c15-faa9aef0c3f2'] },
          { services: ['49535343-fe7d-4ae5-8fa9-9fafd205e455'] },
          { services: ['0000ffe0-0000-1000-8000-00805f9b34fb'] }
        ],
        optionalServices: [
          '000018f0-0000-1000-8000-00805f9b34fb',
          'e7810a71-73ae-499d-8c15-faa9aef0c3f2',
          '49535343-fe7d-4ae5-8fa9-9fafd205e455',
          '0000ffe0-0000-1000-8000-00805f9b34fb',
          '00001800-0000-1000-8000-00805f9b34fb',
          '00001801-0000-1000-8000-00805f9b34fb'
        ],
        acceptAllDevices: false
      }).catch(async () => {
        return await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: [
            '000018f0-0000-1000-8000-00805f9b34fb',
            'e7810a71-73ae-499d-8c15-faa9aef0c3f2',
            '49535343-fe7d-4ae5-8fa9-9fafd205e455',
            '0000ffe0-0000-1000-8000-00805f9b34fb'
          ]
        });
      });

      const server = await device.gatt.connect();
      const services = await server.getPrimaryServices();
      let writeChar = null;

      for (let service of services) {
        const characteristics = await service.getCharacteristics();
        for (let char of characteristics) {
          if (char.properties.write || char.properties.writeWithoutResponse) {
            writeChar = char;
            break;
          }
        }
        if (writeChar) break;
      }

      if (!writeChar) {
        throw new Error("Tidak dapat menemukan karakteristik printer untuk mengirim data!");
      }

      this.bluetoothDevice = device;
      this.bluetoothCharacteristic = writeChar;
      return device.name || "Bluetooth Printer";
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  async printBluetooth(dataUint8) {
    if (!this.bluetoothCharacteristic) {
      await this.connectBluetooth();
    }
    const CHUNK_SIZE = 512;
    for (let i = 0; i < dataUint8.length; i += CHUNK_SIZE) {
      const chunk = dataUint8.slice(i, i + CHUNK_SIZE);
      if (this.bluetoothCharacteristic.writeValueWithoutResponse) {
        await this.bluetoothCharacteristic.writeValueWithoutResponse(chunk);
      } else {
        await this.bluetoothCharacteristic.writeValue(chunk);
      }
      await new Promise(r => setTimeout(r, 20));
    }
  },

  async connectUSB() {
    if (!this.isSerialSupported()) {
      throw new Error("Web Serial tidak didukung di browser ini. Silakan gunakan Google Chrome / Edge.");
    }
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      this.serialPort = port;
      return "USB / Serial Printer";
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  async printUSB(dataUint8) {
    if (!this.serialPort || !this.serialPort.writable) {
      await this.connectUSB();
    }
    const writer = this.serialPort.writable.getWriter();
    await writer.write(dataUint8);
    writer.releaseLock();
  }
};

if (typeof window !== 'undefined') {
  window.EscPosBuilder = EscPosBuilder;
  window.ThermalPrinterDevice = ThermalPrinterDevice;
}

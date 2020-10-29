import { reactive, readonly, watch, ref} from 'vue';
import {set, get} from 'idb-keyval';
import MicroEmitter from 'micro-emitter';

class Socket {
  data;
  ws;
  connected;
  emitter = new MicroEmitter();
  _this = this;
  constructor(ip) {
    this.ws = new WebSocket("wss://" + ip + "/ws");
    this.ws.onopen = ((event) => {
      this.connected = true;
      console.log("Connected!");
    });
    this.ws.onmessage = ((event) => {
      this.data = event.data;
      this.emitter.emit('done', this.data);
    });
  }

  on(event, callback) {
    this.emitter.on(event, () => {
      return callback(this.data);
    });
  }

  send(data) {
    this.ws.send(JSON.stringify(data));
  }
}

class Light {
  ip = "0.0.0.0";
  name = "Undefined";
  socket = null;
  config = {
    command: "udp",
    num_leds: 50,
    animation: "rainbow",
    enhance_colors: true,
    fade_delay: 10,
    fade_steps: 10,
    fill_color: "000000",
    isAnimation: false,
    isColor: false,
    isOff: false,
    isUdp: true,
    minimum_black: 30,
    offset: 8,
    saturation: 1,
    sleep_color: "000000",
    vibrance: 0,
  };
  constructor(ip, name, config) {
    this.ip = ip;
    this.name = name;
    this.config = config;
    // this.socket = new Socket(this.ip);
    this.socket = new Socket(this.ip);
    this.socket.on('done', (data) => {
      this.config = JSON.parse(data);
      console.log(this.config);
    });
  }

  reconnect() {
    this.socket = new Socket(this.ip);
  }

  save() {
    this.config.command = "color";
    this.config.fill_color = "ff00ff";
    if(this.socket != null) {
      this.socket.send(this.config);
    }
  }

}

class Model {
  data() {
    return {
    }
  }
  constructor(modelName) {
      this.modelName = modelName;
      let data = this.data();
      this.state = reactive(data);
      this.isInitialized = ref(false);
  }
  getState() {
      return this.state;
  }

  restore(json) {
    Object.assign(this.state, json);
  }
 
  async init() {
    if (this.isInitialized) {
        let stateFromIndexedDB = await get(this.modelName);
        if (stateFromIndexedDB) {
            this.restore(JSON.parse(stateFromIndexedDB));
        }
        watch(() => this.state, (val) => set(this.modelName, JSON.stringify(val)), { deep: true });
        this.isInitialized.value = true;
    }
  }
  getIsInitialized() {
    return this.isInitialized;
  }
}

class LightModel extends Model {
  data() {
    return {
      lights: [],
    }
  }
  constructor() {
    super('lightModel');
  }
  restore(json) {
    json.lights.forEach((saved, index) => {
      json.lights[index] = new Light(saved.ip, saved.name, saved.config);
    });
    
    super.restore(json);
  }
  add(ip,name) {
    this.state.lights.push(new Light(ip, name));
  }
  clear() {
    this.state.lights = [];
  }
}

const lightModel = new LightModel();

export default lightModel;
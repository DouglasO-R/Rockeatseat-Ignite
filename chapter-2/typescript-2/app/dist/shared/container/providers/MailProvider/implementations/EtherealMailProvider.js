"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EtherealMailProvider = void 0;

var _tsyringe = require("tsyringe");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var fs = _interopRequireWildcard(require("fs"));

var _dec, _dec2, _dec3, _class;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EtherealMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class EtherealMailProvider {
  constructor() {// this.createClient();

    this.client = void 0;
  }

  async sendEmail(to, subject, variables, path) {
    if (!this.client) {
      await this.createClient();
    }

    const templateFileContent = fs.readdirSync(path).toString();

    const templateParse = _handlebars.default.compile(templateFileContent);

    const templateHtml = templateParse(variables);
    const message = await this.client.sendMail({
      to,
      from: "Rentx<noreply@rentx.com.br>",
      subject,
      html: templateHtml
    });
    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", _nodemailer.default.getTestMessageUrl(message));
  }

  async createClient() {
    try {
      const account = await _nodemailer.default.createTestAccount();
      this.client = _nodemailer.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
    } catch (err) {
      console.error(`EtherealMailProvider - Error:\n${err}`);
    }
  }

}) || _class) || _class) || _class);
exports.EtherealMailProvider = EtherealMailProvider;
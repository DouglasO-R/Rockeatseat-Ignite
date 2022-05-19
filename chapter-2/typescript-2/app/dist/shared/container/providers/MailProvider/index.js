"use strict";

var _tsyringe = require("tsyringe");

var _EtherealMailProvider = require("./implementations/EtherealMailProvider");

_tsyringe.container.registerInstance("EtherealMailProvider", new _EtherealMailProvider.EtherealMailProvider());
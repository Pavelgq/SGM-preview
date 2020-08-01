"use strict";

import View from './scripts/view/view.js';
import Model from './scripts/model/model.js';
import Controller from './scripts/control/controller.js';

const model = new Model();
const view = new View(model);
const controller = new Controller(model, view);

controller.init();

controller.connectElements('BUTTON','click');
"use strict";

import View from '../view/view.js';
import Model from '../model/model.js';


export default class Controller {

  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.eventHandler = this.eventHandler.bind(this);
    this.acceptQuest = this.acceptQuest.bind(this);
    this.resetQuest = this.resetQuest.bind(this);
  }

  init() {
    
    console.log(this.model);

    this.view.renderPlayfield();
    this.view.renderTime();
    this.view.renderPlayerState();
    this.view.renderQuestList();
    
  }

  connectElements(selector, event) {
    let elements = document.querySelectorAll(selector);
    for (let element of elements)
      element.addEventListener(event, e => this.eventHandler(e));
  }

  eventHandler(event) {
    let index = event.target.closest('BUTTON').dataset.index;
    
    switch (index) {
      case 'nextStep':
        this.nextStep();
        break;
      case 'map':
        this.view.showPage(index);
        break;
      case 'quest':
        if (this.model.quests.length == 0) {
          this.model.createQuests();
        }
       
        this.view.renderQuestList();
        this.questEvents(this.view.questsContainer);
        this.view.showPage(index);

        break;
      case 'hangar':
        
          this.view.renderHangar(this.model.player.hangar);
          this.hangarEvents();
          // this.questEvents(контэйнер);
        
       
        this.view.showPage(index);
        break;
      case 'news':
        this.view.showPage(index);
        break;
      case 'shop':
        this.view.showPage(index);
        break;
      // case 'accept':
      //   this.model.createQuests();
      //   this.view.renderQuestList();
      //   break;
      default:
        console.log('Что это ты нажал?', event);
        break;
    }
  }

  nextStep() {

    this.model.change();
    this.view.renderPlayfield();
    this.view.renderTime();
    this.view.renderPlayerState();
    this.view.renderHangar(this.model.player.hangar);
    this.hangarEvents();
  }


  questEvents(container) {
    const item = container.querySelectorAll(`.quest__item`);
    item.forEach(element => {
      const button = element.querySelector(".quest__accordion");
      button.addEventListener('click', this.view.showQuest);

      const accept = element.querySelector(".quest__accept");
      accept.addEventListener('click', this.acceptQuest)

      const reset = element.querySelector(".quest__reset");
      reset.addEventListener('click', this.resetQuest);

      const select = element.querySelector(".quest__select--plane");
      const options = this.view.renderSelectPlane();
      select.innerHTML = options;
    })
  }

  acceptQuest(event) {
    this.model.acceptQuest(event);
    this.view.renderQuestList();
    this.questEvents(this.view.questsContainer);
  }

  resetQuest(event) {
    this.model.resetQuest(event);
    this.view.renderQuestList();
    this.questEvents(this.view.questsContainer);
  }

  hangarEvents() {
    this.model.player.hangar.planes.forEach(plane => {
      let questContainer = this.view.hangarContainer.querySelector(`.quest-for-${plane.name}`);
      if (Object.keys(plane.currentQuest).length != 0) {
  
        this.view.renderQuest(plane.currentQuest, 1, questContainer);
      } else {
        questContainer.innerHTML = `Заданий пока нет..`;
      }
  
  
      
    });
    const item = this.view.hangarContainer.querySelectorAll(`.plane`);
      item.forEach(element => {
        const button = element.querySelector(".plane__accordion");
        button.addEventListener('click', this.view.showPlane);
      });
  }  
}
import { Say } from './shared/say.service';
import { Dialog } from './shared/dialog';

class Module {
  title = 'Heroku Wakka';
  say = new Say();
  select = 'Dialog';

  onload() {
    const h1 = document.getElementsByTagName('h1')[0] as HTMLHeadingElement;
    h1.innerText = this.title;
  }

  updateSelect(): void {
    const select = document.getElementById('select') as HTMLSelectElement;
    this.select = select.value;
  }

  updateDisplay(msg: string): void {
    const display = document.getElementById('display') as HTMLDivElement;
    display.innerText = msg;
  }

  shout(): void {
    const input = document.getElementById('msg') as HTMLInputElement;
    switch (this.select) {
      case 'Alert': this.say.alert(input.value); break;
      case 'Console': this.say.console(input.value); break;
      case 'UI': this.updateDisplay(input.value); break;
      case 'Dialog': dialog.open(input.value); break;
    }
  }
}
export const module = new Module();
export const dialog = new Dialog();

window.addEventListener('load', () => {
  module.onload();
});

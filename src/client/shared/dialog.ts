export class Dialog {
  open(msg: string): void {
    const dialog = document.getElementById('dialog') as HTMLDivElement;
    dialog.style.display = 'flex';
    const message = document.getElementById('message') as HTMLDivElement;
    message.innerText = msg;
  }

  close(): void {
    const dialog = document.getElementById('dialog') as HTMLDivElement;
    dialog.style.display = 'none';
  }
}

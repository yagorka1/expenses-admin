import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  public buttonType: 'button' | 'submit' = 'button';

  @Input()
  public small: boolean = false;

  @Input()
  public high: boolean = false;

  @Input()
  public disabled: boolean = false;

  @Input()
  public isLoading: boolean = false;
  //
  @Input()
  public buttonStyle: 'main' | 'danger' | 'secondary' = 'main';
}

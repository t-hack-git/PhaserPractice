import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import { MainScene } from './scenes/mainscene';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  private _phaserGame: Phaser.Game|null;
  private _config: Phaser.Types.Core.GameConfig;

  constructor() {
    this._config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: [MainScene],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 }
        }
      }
    };
  }

  ngOnInit(): void {
    this._phaserGame = new Phaser.Game(this._config);
  }
}

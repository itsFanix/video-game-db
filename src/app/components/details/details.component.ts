import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {Game} from 'src/app/models';
import {HttpService} from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
/**
 * DetailsComponent
 */
export class DetailsComponent implements OnInit {
  public gameRating: number = 0;
  gameId: number = 0;
  game: Game | undefined;
  routeSub: Subscription | undefined;
  gameSub: Subscription | undefined;

  /**
   * @param {ActivatedRoute} ActivatedRoute
   * @param {HttpService} httpService
   */
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httpService: HttpService,
  ) {}

  /**
   * @return {void}
   */
  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }
  /**
   * @param {number} id
   * @return {void}
   */
  getGameDetails(id: number): void {
    this.gameSub = this.httpService
        .getGameDetails(id)
        .subscribe((gameResp: Game) => {
          this.game = gameResp;

          setTimeout(() => {
            this.gameRating =
            this.game && this.game.metacritic ? this.game.metacritic : 0;
          }, 1000);
        });
  }
  /**
   *
   * @param {number} value
   * @return {string}
   */
  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  /**
   * @return {void}
   */
  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}

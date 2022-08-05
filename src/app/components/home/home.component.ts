import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {APIResponse, Game} from 'src/app/models';
import {HttpService} from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
/**
 * represents Home
 */
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string = '';
  public games: Array<Game> = [];
  private routeSub: Subscription | undefined;
  private gameSub: Subscription | undefined;
  private gameSearch: string | undefined;
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 40];

  /**
   *
   * @param { HttpService} httpService
   * @param { ActivatedRoute} activatedRoute
   * @param {Router} router
   */
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  /**
   * @return {void}
   */
  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.gameSearch = params['game-search'];
      } else {
        this.gameSearch = undefined;
      }

      this.searchGames('metacrit', 1, this.gameSearch);
    });
  }
  /**
   *
   * @param {string} sort
   * @param { number} page
   * @param  {string} search
   * @return {void}
   */
  searchGames(sort: string, page: number, search?: string): void {
    this.gameSub = this.httpService
        .getGameList(sort, this.pageSize, page, search)
        .subscribe((gameList: APIResponse<Game>) => {
          this.games = gameList.results;
          this.length = gameList.count;
        });
  }
  /**
   *
   * @param {number} id
   */
  openGameDetails(id: number): void {
    this.router.navigate(['details', id]);
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

  /**
   * @param { string } setPageSizeOptionsInput
   */
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
          .split(',')
          .map((str) => +str);
    }
  }

  /**
   * Methode de gestion de la pagination
   * @param {PageEvent} pageEvent
   */
  onPageChange(pageEvent: PageEvent): void {
    console.log(JSON.stringify(pageEvent));

    this.pageSize = pageEvent.pageSize;
    this.searchGames('metacrit', pageEvent.pageIndex + 1, this.gameSearch);
  }
}

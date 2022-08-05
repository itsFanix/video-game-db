import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, map, Observable} from 'rxjs';
import {environment as env} from 'src/environments/environment';
import {APIResponse, Game} from '../models';

@Injectable({
  providedIn: 'root',
})
/**
 * Service Http
 */
export class HttpService {
  /**
   *
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {}

  /**
   * @param {string} ordering
   * @param {number} pageSize
   * @param { number} page
   * @param {string} search
   * @return {Observable<ApiResponse<Game>>}
   */
  getGameList(
      ordering: string,
      pageSize: number,
      page: number,
      search?: string,
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams()
        .set('ordering', ordering)
        .set('page_size', pageSize)
        .set('page', page);
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('seach', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }
  /**
   * @param { number}id
   * @return {Observable<Game>}
   */
  getGameDetails(id: number): Observable<Game> {
    const gameInfoRequest = this.http.get<Game>(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get<{ results: [] }>(
        `${env.BASE_URL}/games/${id}/movies`,
    );
    const gameScreenshotesRequest = this.http.get<{ results: [] }>(
        `${env.BASE_URL}/games/${id}/screenshots`,
    );
    return forkJoin({
      gameInfoRequest,
      gameTrailersRequest,
      gameScreenshotesRequest,
    }).pipe(
        map(
            (resp: {
          gameInfoRequest: Game;
          gameTrailersRequest: { results: [] };
          gameScreenshotesRequest: { results: [] };
        }) => {
              return {
                ...resp.gameInfoRequest,
                screenshots: resp.gameScreenshotesRequest?.results,
                trailers: resp.gameTrailersRequest?.results,
              };
            },
        ),
    );
  }
}

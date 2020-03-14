import * as React from 'react';
import { Observable, Subject, from } from 'rxjs';
import { debounceTime, takeUntil, filter, switchMap, map } from 'rxjs/operators';

import { Album, AlbumData } from './album.component';

export class AlbumContainer extends React.Component<{ search$: Observable<string> }, { albums: AlbumData[] }> {
  state = {
    albums: [],
  };

  private readonly unsubscribe$ = new Subject();

  componentDidMount() {
    this.props.search$.pipe(debounceTime(500), takeUntil(this.unsubscribe$)).subscribe(term => {
      const req = new Request(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=album`);
      from(fetch(req))
        .pipe(
          filter<Response>(res => res.ok),
          switchMap(res => res.json()),
          map((resultsJSON: { resultCount: number; results: AlbumData[] }) => resultsJSON.results),
        )
        .subscribe(albums => {
          this.setState({ albums });
        });
    });
  }

  componentWillUnmount() {
    this.unsubscribe$.next();
  }

  render() {
    return this.state.albums.map((alb, i) => <Album key={i} {...alb} />);
  }
}

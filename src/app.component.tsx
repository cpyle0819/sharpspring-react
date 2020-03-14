import * as React from 'react';
import { Subject, from } from 'rxjs';
import { takeUntil, debounceTime, filter, switchMap, map } from 'rxjs/operators';

import { Album, AlbumData } from 'src/album/album.component';
import { Search } from 'src/search/search.component';

export class App extends React.Component<{}, { albums: AlbumData[] }> {
  state = {
    albums: [],
  };

  private search$ = new Subject<string>();
  private unsubscribe$ = new Subject();

  componentWillUnmount() {
    this.unsubscribe$.next();
  }

  componentDidMount() {
    this.search$.pipe(debounceTime(300), takeUntil(this.unsubscribe$)).subscribe(term => {
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

  render(): JSX.Element {
    return (
      <div>
        <Search subject$={this.search$} />
        {this.state.albums.map((alb, i) => (
          <Album key={i} {...alb} />
        ))}
      </div>
    );
  }
}

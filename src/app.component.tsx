import * as React from 'react';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { Album, AlbumData } from 'src/album/album.component';
import { Search } from 'src/search/search.component';

export class App extends React.Component<{}, { albums: AlbumData[] }> {
  state = {
    albums: [{ name: 'An Evening Wasted with Tom Lehrer', artist: 'Tom Lehrer', releaseDate: '1959', imgUrl: '' }],
  };

  private search$ = new Subject<string>();
  private unsubscribe$ = new Subject();

  componentWillUnmount() {
    this.unsubscribe$.next();
  }

  componentDidMount() {
    this.search$.pipe(debounceTime(300), takeUntil(this.unsubscribe$)).subscribe(() => {
      // make API call here and set albums
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

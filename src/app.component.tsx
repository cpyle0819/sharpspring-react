import * as React from 'react';
import { Subject, from } from 'rxjs';

import { AlbumContainer } from 'src/album/albums-container.component';
import { Search } from 'src/search/search.component';

export class App extends React.Component {
  private search$ = new Subject<string>();

  render(): JSX.Element {
    return (
      <React.Fragment>
        <Search subject$={this.search$} />
        <AlbumContainer search$={this.search$.pipe()}></AlbumContainer>
      </React.Fragment>
    );
  }
}

import './app.component.css';

import * as React from 'react';
import { Subject } from 'rxjs';

import { AlbumContainer } from 'src/album/albums-container.component';
import { Search } from 'src/search/search.component';

export class App extends React.Component {
  private search$ = new Subject<string>();

  render(): JSX.Element {
    return (
      <React.Fragment>
        <h2 id="search-header">Search For Album</h2>
        <Search subject$={this.search$} />
        <h2>Results</h2>
        <AlbumContainer search$={this.search$.pipe()}></AlbumContainer>
      </React.Fragment>
    );
  }
}

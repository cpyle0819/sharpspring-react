import * as React from 'react';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { Search } from 'src/search/search.component';

export class App extends React.Component<{}, { albums: any[]; searchText: string }> {
  private search$ = new Subject<string>();
  private unsubscribe$ = new Subject();

  componentWillUnmount() {
    this.unsubscribe$.next();
  }

  componentDidMount() {
    this.search$.pipe(debounceTime(300), takeUntil(this.unsubscribe$)).subscribe(searchText => {
      this.setState({ searchText });
    });
  }

  state = {
    albums: [],
    searchText: '',
  };

  render(): JSX.Element {
    return (
      <div>
        <Search subject$={this.search$} />
        <p>{this.state.searchText}</p>
      </div>
    );
  }
}

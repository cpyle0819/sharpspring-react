import './search.component.css';

import * as React from 'react';
import { Subject } from 'rxjs';

export class Search extends React.Component<{ subject$: Subject<string> }> {
  onSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.subject$.next(event.target.value);
  }

  render(): JSX.Element {
    return (
      <input aria-labelledby="search-header" className="SearchInput" onChange={this.onSearchInput.bind(this)}></input>
    );
  }
}

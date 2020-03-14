import * as React from 'react';

export interface AlbumData {
  artistName: string;
  artworkUrl60: string;
  collectionName: string;
  releaseDate: string;
}

export class Album extends React.Component<AlbumData> {
  render(): JSX.Element {
    return (
      <div>
        <strong>{this.props.collectionName}</strong>
        <em>{this.props.artistName}</em>
        <em>{this.props.releaseDate}</em>
        <img src={this.props.artworkUrl60} />
      </div>
    );
  }
}

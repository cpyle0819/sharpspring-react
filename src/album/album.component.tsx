import * as React from 'react';

export interface AlbumData {
  artist: string;
  imgUrl: string;
  name: string;
  releaseDate: string;
}

export class Album extends React.Component<AlbumData> {
  render(): JSX.Element {
    return (
      <div>
        <strong>{this.props.name}</strong>
        <em>{this.props.artist}</em>
        <em>{this.props.releaseDate}</em>
        <img src={this.props.imgUrl} />
      </div>
    );
  }
}

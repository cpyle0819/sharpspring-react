import './album.component.css';
import * as React from 'react';

export interface AlbumData {
  artistName: string;
  artworkUrl100: string;
  collectionName: string;
  collectionViewUrl: string;
  releaseDate: string;
}

export class Album extends React.Component<AlbumData> {
  openUrl() {
    window.open(this.props.collectionViewUrl, '_blank');
  }

  render(): JSX.Element {
    return (
      <div role="link" aria-label={this.props.collectionName} className="Album" onClick={this.openUrl.bind(this)}>
        <div className="AlbumMeta">
          <h3 className="AlbumTitle">{this.props.collectionName}</h3>
          <p className="AlbumReleaseDate">{new Date(this.props.releaseDate).getFullYear()}</p>
          <p className="AlbumArtist">{this.props.artistName}</p>
        </div>
        <img className="AlbumArtwork" src={this.props.artworkUrl100} />
      </div>
    );
  }
}

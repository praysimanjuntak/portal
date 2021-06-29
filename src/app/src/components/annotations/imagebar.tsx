import React, { Component } from "react";
import { Card, Tag, Icon, IconSize } from "@blueprintjs/core";
import { AssetAPIObject } from "@portal/api/annotation";
import VideoThumbnail from "react-video-thumbnail";
import classes from "./imagebar.module.css";

function ThumbnailGenerator(
  asset: AssetAPIObject,
  index: string,
  useDarkTheme: boolean,
  clickCallback: (assetObject: AssetAPIObject) => void,
  currentAssetID: string
): JSX.Element {
  return (
    <Card
      className={["image-bar-thumbnail-card", classes.Card].join(" ")}
      key={index}
      onClick={() => clickCallback(asset)}
    >
      <div
        className={
          asset.assetUrl === currentAssetID
            ? "image-bar-thumbnail image-bar-thumbnail-highlighted"
            : "image-bar-thumbnail"
        }
      >
        {asset.type === "video" ? (
          <>
            {" "}
            <Icon
              className={classes.StackTop}
              icon="video"
              iconSize={IconSize.STANDARD}
            />
            <div>
              <VideoThumbnail
                snapshotAtTime={1}
                videoUrl={asset.thumbnailUrl}
                width={150}
                height={100}
              />
            </div>
          </>
        ) : (
          <img src={asset.thumbnailUrl} alt={asset.filename} />
        )}

        <Tag
          className={["image-bar-filename-tag", classes.Tag].join(" ")}
          fill={true}
          style={{ backgroundColor: useDarkTheme ? "" : "#CED9E0" }}
          rightIcon={
            (asset as any).status ? (
              <Icon icon="tick" color={useDarkTheme ? "#0F9960" : "#3DCC91"} />
            ) : (
              false
            )
          }
        >
          <span
            className={"bp3-ui-text bp3-monospace-text image-bar-filename-text"}
          >
            {asset.filename}
          </span>
        </Tag>
      </div>
    </Card>
  );
}

interface ImageBarProps {
  assetList: Array<AssetAPIObject>;
  useDarkTheme: boolean;
  /* Callbacks Package */
  callbacks: any;
}

export default class ImageBar extends Component<ImageBarProps> {
  private currentAssetID: string;

  constructor(props: ImageBarProps) {
    super(props);
    this.currentAssetID = "";
    this.highlightAsset = this.highlightAsset.bind(this);
  }

  highlightAsset(assetUrl: string): void {
    this.currentAssetID = assetUrl;
    this.forceUpdate();
  }

  render(): JSX.Element {
    return (
      <>
        {this.props.assetList.map(object => {
          return ThumbnailGenerator(
            object,
            object.assetUrl,
            this.props.useDarkTheme,
            this.props.callbacks.selectAssetCallback,
            this.currentAssetID
          );
        })}
      </>
    );
  }
}
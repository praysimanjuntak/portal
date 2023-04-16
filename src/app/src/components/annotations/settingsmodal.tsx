/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import {
  Tooltip,
  Icon,
  Dialog,
  Classes,
  Divider,
  Slider,
  Position,
  ControlGroup,
  RadioGroup,
  Radio,
  Checkbox,
} from "@blueprintjs/core";
import classes from "./settingsmodal.module.css";

interface SettingsModalProps {
  inferenceOptions: any;
  isOpen: boolean;
  useDarkTheme: boolean;
  allowUserClose: boolean;
  onClose: () => void;
  callbacks: {
    HandleChangeInSettings: (value: any, key: string) => void;
    HandleChangeInAnalyticsMode: () => void;
  };
  isAnalyticsMode: boolean;
}
/**
 * @TODO Keechin for the tooltip information
 */
export default class SettingsModal extends React.Component<SettingsModalProps> {
  constructor(props: SettingsModalProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Dialog
        icon="cog"
        title="Advanced Settings"
        canEscapeKeyClose={this.props.allowUserClose}
        canOutsideClickClose={this.props.allowUserClose}
        className={this.props.useDarkTheme ? "bp3-dark" : ""}
        {...this.props}
      >
        <div className={classes.Dialog}>
          <div className={Classes.DIALOG_BODY}>
            <div>General</div>
            <div className={classes.Section}>
              <ControlGroup className={classes.SubTitle}>
                <div>Bulk Analysis</div>
                <Tooltip
                  content="Types of files to analyse in bulk"
                  position={Position.TOP}
                >
                  <Icon icon="help" className={classes.Icon} />
                </Tooltip>
              </ControlGroup>
              <RadioGroup
                inline={true}
                name="bulkAnalysisStatus"
                onChange={event => {
                  this.props.callbacks.HandleChangeInSettings(
                    event.currentTarget.value,
                    "bulkAnalysisStatus"
                  );
                }}
                selectedValue={this.props.inferenceOptions.bulkAnalysisStatus}
              >
                <Radio label="Image Only" value="image" />
                <Radio label="Video Only" value="video" />
                <Radio label="Image and Video" value="both" />
              </RadioGroup>
            </div>
            <div className={classes.Section}>
              <ControlGroup className={classes.SubTitle}>
                <div>Analytics Mode</div>
                <Tooltip
                  content="Run in Analytics Mode with chart"
                  position={Position.TOP}
                >
                  <Icon icon="help" className={classes.Icon} />
                </Tooltip>
              </ControlGroup>
              <Checkbox
                checked={this.props.isAnalyticsMode}
                onChange={() => {
                  this.props.callbacks.HandleChangeInAnalyticsMode();
                }}
                label="Analytics Mode"
              />
            </div>
            <div className={classes.Section}>
              <ControlGroup className={classes.SubTitle}>
                <div>IoU Threshold</div>
                <Tooltip
                  content={
                    <div>
                      Intersection Over Union index, used to describe extent of
                      overlap
                      <br />
                      between 2 boxes. A higher value means stricter threshold.
                      <br />
                      Click to learn more
                    </div>
                  }
                  position={Position.TOP}
                >
                  <Icon
                    icon="help"
                    className={classes.Icon}
                    onClick={() => {
                      window.open(
                        "https://docs.datature.io/portal/running-inferences#intersection-over-union-iou-threshold"
                      );
                    }}
                  />
                </Tooltip>
              </ControlGroup>

              <Slider
                className={classes.Slider}
                min={0}
                max={1}
                onChange={iou => {
                  this.props.callbacks.HandleChangeInSettings(
                    Math.round(iou * 10) / 10,
                    "iou"
                  );
                }}
                stepSize={0.1}
                labelStepSize={1}
                value={this.props.inferenceOptions.iou}
                vertical={false}
              />
            </div>
            <Divider className={classes.Divider} />
            <div>Video</div>
            <div className={classes.Section}>
              <ControlGroup className={classes.SubTitle}>
                <div>Frame Interval</div>
                <Tooltip
                  content={
                    <div>
                      Predictions generated per frame. The higher the number,{" "}
                      <br />
                      the higher the prediction speed and the lower the quality.
                      <br />
                      Click to learn more
                    </div>
                  }
                  position={Position.TOP}
                >
                  <Icon
                    icon="help"
                    className={classes.Icon}
                    onClick={() => {
                      window.open(
                        "https://docs.datature.io/portal/running-inferences#frame-interval"
                      );
                    }}
                  />
                </Tooltip>
              </ControlGroup>

              <Slider
                className={classes.Slider}
                min={1}
                max={20}
                onChange={frameInterval => {
                  this.props.callbacks.HandleChangeInSettings(
                    frameInterval,
                    "frameInterval"
                  );
                }}
                stepSize={1}
                labelStepSize={19}
                value={this.props.inferenceOptions.video.frameInterval}
                vertical={false}
              />
            </div>{" "}
          </div>
        </div>
      </Dialog>
    );
  }
}

import RecordRTC, {
  // @ts-ignore
  RecordRTCPromisesHandler,
} from "recordrtc";

type startProps = {
  setRecorder: Dispatch<SetStateAction<RecordRTC>>;
  setStream: Dispatch<SetStateAction<MediaStream>>;
  setVideoUrlBlob: Dispatch<SetStateAction<Blob>>;
};

type stopProps = {
  recorder: RecordRTC;
  setRecorder: Dispatch<SetStateAction<RecordRTC>>;
  setStream: Dispatch<SetStateAction<MediaStream>>;
  setVideoUrlBlob: Dispatch<SetStateAction<Blob>>;
};

export const startRecording = async (
  setRecorder,
  setStream,
  setVideoUrlBlob
): startProps => {
  const mediaDevices = navigator.mediaDevices;
  const stream: MediaStream = await mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  const recorder: RecordRTC = new RecordRTCPromisesHandler(stream, {
    type: "video",
  });

  await recorder.startRecording();
  setRecorder(recorder);
  setStream(stream);
  setVideoUrlBlob(null);
};

export const stopRecording = async (
  recorder,
  setRecorder,
  setStream,
  setVideoUrlBlob
): stopProps => {
  if (recorder) {
    await recorder.stopRecording();
    const blob: Blob = await recorder.getBlob();
    (stream as any).stop();
    setVideoUrlBlob(blob);
    setStream(null);
    setRecorder(null);
  }
};

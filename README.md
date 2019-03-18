# Remote Picture Frontend

A simple [WebApp](https://remote-picture.netlify.com) that allows to take pictures from a device using another device as remote trigger.
To stream data between the devices, WebRTC is used, so no info is sent to any server.
The `ImageCapture` API is used to take a picture at max resolution from the media capture hardware of the device, instead of a frame of the videostream, to avoid losing quality.
The picture is saved on the camera device.

### TODO:

- Shutter with countdown
- Better style
- Control flash
- many other stuff...

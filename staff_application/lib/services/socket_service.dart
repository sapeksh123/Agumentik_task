import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  static final socket = IO.io(
    "http://10.0.2.2:5000",
    IO.OptionBuilder().setTransports(['websocket']).build(),
  );
}

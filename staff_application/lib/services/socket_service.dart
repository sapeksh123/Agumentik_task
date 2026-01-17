import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  static final socket = IO.io(
    "https://agumentik-task-v9i2.onrender.com",
    IO.OptionBuilder().setTransports(['websocket']).build(),
  );
}

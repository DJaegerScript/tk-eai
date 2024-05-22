import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

Future<List<String>> fetchLocationsData() async {
  List<String> locationsResult = [];
  var response = await http.get(
    Uri.http("tk-eai-production.up.railway.app", "/locations", {}),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Accept": "*/*"
    }
  );

  var data = jsonDecode(utf8.decode(response.bodyBytes));
  for (var d in data["locations"]) {
    if (d != null) {
      locationsResult.add(d["name"]);
    }
  }
  
  return locationsResult;
}
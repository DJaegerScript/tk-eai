import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

Future<List<String>> fetchCompaniesData() async {
  List<String> companiesResult = [];
  var response = await http.get(
    Uri.http("tk-eai-production.up.railway.app", "/companies", {}),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Accept": "*/*"
    }
  );

  var data = jsonDecode(utf8.decode(response.bodyBytes));
  for (var d in data["companies"]) {
    if (d != null) {
      companiesResult.add(d["name"]);
    }
  }

  return companiesResult;
}
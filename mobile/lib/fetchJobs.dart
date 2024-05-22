import 'package:job_scrapper/model/JobData.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

Future<Map<String, dynamic>> fetchJobsData(String title, String profession, String location, String company, String date, String page) async {
  //List<JobDataModel> jobsDataResult = [];
  Map<String, dynamic> jobsDataResult = {};
  if (location == "All") location = "";
  if (company == "All") company = "";
  var response = await http.get(
    Uri.http("tk-eai-production.up.railway.app", "/", {
      "title":title,
      "profession":profession,
      "location": location,
      "company": company,
      "date": date,
      "page": page
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Accept": "*/*"
    }
  );

  var data = jsonDecode(utf8.decode(response.bodyBytes));
  List<JobDataModel> temp = [];
  for (var d in data["data"]) {
    if (d != null) {
      temp.add(JobDataModel.fromJson(d));
    }
  }
  jobsDataResult["data"] = temp;
  jobsDataResult["hasNext"] = data["meta"]["hasNext"];
  jobsDataResult["hasPrev"] = data["meta"]["hasPrev"];
  jobsDataResult["total"] = data["meta"]["total"];

  return jobsDataResult;
}
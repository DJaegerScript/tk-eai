import 'package:intl/intl.dart';

class JobDataModel {
  String title;
  String profession;
  String date;
  String location;
  String company;
  String source;
  String url;

  JobDataModel({
    required this.title,
    required this.profession,
    required this.date,
    required this.location,
    required this.company,
    required this.source,
    required this.url
  });

  factory JobDataModel.fromJson(Map<String, dynamic> json) {
    return JobDataModel(
      title: json["title"],
      profession: json["profession"],
      date: DateFormat("yyyy-MM-dd").format(DateTime.parse(json["date"])),
      location: json["location"],
      company: json["company"],
      source: json["source"],
      url: json["url"],

    );
  }
}
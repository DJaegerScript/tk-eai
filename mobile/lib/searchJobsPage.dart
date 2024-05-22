import 'package:flutter/material.dart';
import 'package:job_scrapper/model/JobData.dart';
import 'package:job_scrapper/fetchJobs.dart';
import 'package:job_scrapper/fetchCompanies.dart';
import 'package:job_scrapper/fetchLocations.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:dropdown_search/dropdown_search.dart';

class SearchJobsPage extends StatefulWidget {
  const SearchJobsPage({super.key, required this.jobTypeFilter});
  final String jobTypeFilter;
  @override
  State<SearchJobsPage> createState() => _SearchJobsPageState();
}

class _SearchJobsPageState extends State<SearchJobsPage> {
  final TextEditingController _dateController = TextEditingController();
  bool _isFilterVisible = true;
  final ScrollController _scrollController = ScrollController();

  List<JobDataModel> _jobsData = [];
  List<String> _companiesList = ["All"];
  List<String> _locationsList = ["All"];

  String _profession = "";
  String _location = "All";
  String _company = "All";
  String _date = "";
  String _title = "";
  int _page = 1;
  int _totalJobs = 0;

  bool _hasNextPage = false;
  bool _hasPrevPage = false;
  bool _hasResult = false;

  void _getJobsData() async {
    Map<String, dynamic> fetchedData = await fetchJobsData(_title, _profession, _location, _company, _date, _page.toString());
    setState(() {
      _jobsData = fetchedData["data"];
      _hasNextPage = fetchedData["hasNext"];
      _hasPrevPage = fetchedData["hasPrev"];
      _totalJobs = fetchedData["total"];
      _isFilterVisible = false;

      if (_jobsData.isNotEmpty) {
        _hasResult = true;
      } else {
        _hasResult = false;
      }
    });
    _scrollController.jumpTo(_scrollController.position.minScrollExtent);
  }

  Future selectDate(BuildContext context) async {
    DateTime? picked = await showDatePicker(
        context: context,
        initialDate: DateTime.now(),
        firstDate: DateTime(1337),
        lastDate: DateTime.now());
    if (picked != null) {
      setState(() {
        _date =
            "${picked.toLocal().year}/${picked.toLocal().month}/${picked.toLocal().day}";
        _dateController.text = _date;
      });
    }
  }

  Future<void> _launchUrl(String url) async {
    if (!await launchUrl(Uri.parse(url))) {
      throw Exception('Could not launch $url');
    }
  }
 
  @override
  void initState() {
    super.initState();
    if (widget.jobTypeFilter != "") {
      _profession = widget.jobTypeFilter;
    }
    fetchLocationsData().then((value) => setState(() {
      _locationsList.addAll(value);
    }));

    fetchCompaniesData().then((value) => setState(() {
      _companiesList.addAll(value);
    }));
  }

  Widget _filterForm() {
    return Container(
      color: Colors.white,
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(12),
            child: DropdownButtonFormField(
              decoration: InputDecoration(
                filled: true,
                fillColor: Colors.white,
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                  borderSide: const BorderSide(width: 1,color: Colors.black),
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                )
              ),
              value: _profession,
              onChanged: (value) {_profession = value!;},
              items: const [
                DropdownMenuItem(
                  value: "",
                  child: Text("All")
                ),
                DropdownMenuItem(
                  value: "Programmer",
                  child: Text("Programmer")
                ),
                DropdownMenuItem(
                  value: "Data",
                  child: Text("Data")
                ),
                DropdownMenuItem(
                  value: "Cyber Security",
                  child: Text("Cyber Security")
                ),
                DropdownMenuItem(
                  value: "Network",
                  child: Text("Network")
                ),
              ],
            )),

          Padding(
            padding: const EdgeInsets.all(12),
            child:TextFormField(
              initialValue: _title,
              decoration: InputDecoration(
                labelText: "Pekerjaan",
                filled: true,
                fillColor: Colors.white,
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                  borderSide: const BorderSide(width: 1,color: Colors.black),
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                )
              ),
              onChanged: (value) {_title = value;},
          )),

          Padding(
            padding: const EdgeInsets.all(12),
              child: DropdownSearch<String>(
              popupProps: const PopupProps.menu(
                  showSelectedItems: true,
                  showSearchBox: true
              ),
              items: _locationsList,
              dropdownDecoratorProps: DropDownDecoratorProps(
                  dropdownSearchDecoration: InputDecoration(
                      labelText: "Lokasi",
                      enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                  borderSide: const BorderSide(width: 1,color: Colors.black),
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                )
                  ),
              ),
              onChanged: (value) {_location = value!;},
              selectedItem: _location,
          )),

          Padding(
            padding: const EdgeInsets.all(12),
              child: DropdownSearch<String>(
              popupProps: const PopupProps.menu(
                  showSelectedItems: true,
                  showSearchBox: true
              ),
              items: _companiesList,
              dropdownDecoratorProps: DropDownDecoratorProps(
                  dropdownSearchDecoration: InputDecoration(
                      labelText: "Perusahaan",
                      enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                  borderSide: const BorderSide(width: 1,color: Colors.black),
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                )
                  ),
              ),
              onChanged: (value) {_company = value!;},
              selectedItem: _company,
          )),

          Padding(
            padding: const EdgeInsets.all(12),
            child: TextFormField(
              onTap: () => selectDate(context),
              decoration: InputDecoration(
                labelText: "Tanggal publikasi",
                filled: true,
                fillColor: Colors.white,
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                  borderSide: const BorderSide(width: 1,color: Colors.black),
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                )
              ),
              readOnly: true,
              controller: _dateController,
              onChanged: (value) {_date = value;},
          )),

          Padding(
            padding: const EdgeInsets.all(12),
            child: Container(
              height: 45,
              child: TextButton(
                onPressed: () {
                  _page = 1;
                  _getJobsData();
                },
                style: TextButton.styleFrom(
                  backgroundColor: Colors.black,
                ),
                child: const Text(
                  "Search",
                  style: TextStyle(color: Colors.white),
                )
              ),
            )
          ),
        ],
      )
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(
          color: Colors.black
        ),
        title: const Text(
          "EAI Job Scrapper",
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.white
      ),
      body: Center(
        child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topRight,
              end: Alignment.bottomLeft,
              colors: [
                Color.fromRGBO(148, 35, 206, 1),
                Color.fromRGBO(96, 164, 250, 1),
              ],
            )
          ),
          child: ListView(
            controller: _scrollController,
            children: [
              Visibility(
                visible: _isFilterVisible,
                maintainState: true,
                child: _filterForm()
              ),
              
              Padding(
                padding: const EdgeInsets.only(bottom:12),
                child: Container(
                  height: 45,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.black,
                      shape: const RoundedRectangleBorder(
                        borderRadius: BorderRadius.only(
                          bottomLeft: Radius.circular(30),
                          bottomRight: Radius.circular(30),
                        )
                      )
                    ),
                    onPressed: () { 
                      setState(() { 
                        _isFilterVisible = !_isFilterVisible; 
                      }); 
                    }, 
                    child: const Text(
                      "Filter Pekerjaan",
                      style: TextStyle(color: Colors.white),
                    )
                  ),
                )
              ),

              Visibility(
                visible: _hasResult,
                child: Padding(
                  padding: const EdgeInsets.only(bottom:15, top:5, left:15, right:15),
                  child: Text(
                    "Ditemukan $_totalJobs pekerjaan terkait",
                    style: const TextStyle(
                      color: Colors.white, 
                      fontSize: 15,
                      //fontWeight: FontWeight.bold
                    ),
                  )
                )
              ),

              ..._jobsData.map((JobDataModel e) => Card(
                  color: Colors.white,
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          e.title,
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Text('Perusahaan: ${e.company}'),
                        Text('Lokasi: ${e.location}'),
                        Text('Sumber: ${e.source}'),
                        Text('Dipublikasi: ${e.date}'),
                        InkWell(
                          onTap: () => _launchUrl(e.url),
                          child: const Text(
                            "Visit Link",
                            style: TextStyle(color: Colors.blue),
                          ),
                        )
                      ],
                    ),
                  )
                )
              ),

              Visibility(
                visible: !_hasResult,
                child: const Center(
                  child: Text(
                    "Tidak ditemukan pekerjaan terkait",
                    style: TextStyle(
                      color: Colors.white, 
                      fontSize: 20,
                      fontWeight: FontWeight.bold
                    ),
                  )
                )
              ),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Visibility(
                    visible: _hasPrevPage,
                    maintainSize: true,
                    maintainAnimation: true,
                    maintainState: true,
                    child: IconButton(
                      color: Colors.white,
                      iconSize: 30,
                      icon: const Icon(Icons.arrow_back),
                      onPressed: () {
                        _page -= 1;
                        _getJobsData();
                      }
                    )
                  ),

                  Visibility(
                    visible: _hasResult,
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                        child: SizedBox(
                        width: 60,
                        height: 30,
                        child: TextFormField(
                          initialValue: _page.toString(),
                          textInputAction: TextInputAction.go,
                          onFieldSubmitted: (value) {
                            if (value != "" && int.tryParse(value) != null) {
                              int temp = int.tryParse(value)!;
                              if(temp >= 1) {
                                _page = temp;
                                _getJobsData();
                              }
                            }
                          },
                          style: const TextStyle(fontSize: 17.0, height: 1, color: Colors.white),
                          decoration: InputDecoration(
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(1.0),
                              borderSide: const BorderSide(width: 1,color: Colors.white),
                            ),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(1.0),
                            )
                          ),
                        ),
                      ),
                    )
                  ),

                  Visibility(
                    visible: _hasNextPage,
                    maintainSize: true,
                    maintainAnimation: true,
                    maintainState: true,
                    child: IconButton(
                      color: Colors.white,
                      iconSize: 30,
                      icon: const Icon(Icons.arrow_forward),
                      onPressed: () {
                        _page += 1;
                        _getJobsData();
                      }
                    )
                  ),
                ],
              )
            ],
          )
        )
      )
    );
  }
}

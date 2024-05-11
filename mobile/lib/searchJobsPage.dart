import 'package:flutter/material.dart';
import 'package:job_scrapper/model/JobData.dart';
import 'package:job_scrapper/fetchJobs.dart';
import 'package:url_launcher/url_launcher.dart';

class SearchJobsPage extends StatefulWidget {
  const SearchJobsPage({super.key, required this.jobTypeFilter});
  final String jobTypeFilter;
  @override
  State<SearchJobsPage> createState() => _SearchJobsPageState();
}

class _SearchJobsPageState extends State<SearchJobsPage> {
  DateTime dateFilter = DateTime.now();
  TextEditingController dateController = TextEditingController();
  bool _isFilterVisible = true;
  final ScrollController _scrollController = ScrollController();

  List<JobDataModel> _jobsData = [];

  String _profession = "";
  String _location = "";
  String _company = "";
  String _date = "";
  String _title = "";
  int _page = 1;

  bool _hasNextPage = false;
  bool _hasPrevPage = false;
  bool _hasNoResult = false;

  void _getJobsData() async {
    Map<String, dynamic> _fetchedData = await fetchJobsData(_title, _profession, _location, _company, _date, _page.toString());
    setState(() {
      _jobsData = _fetchedData["data"];
      _hasNextPage = _fetchedData["hasNext"];
      _hasPrevPage = _fetchedData["hasPrev"];
      _isFilterVisible = false;

      if (_jobsData.length <= 0) {
        _hasNoResult = true;
      } else {
        _hasNoResult = false;
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
        dateFilter = picked;
        var date =
            "${picked.toLocal().day}/${picked.toLocal().month}/${picked.toLocal().year}";
        dateController.text = date;
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
                  borderSide: BorderSide(width: 1,color: Color.fromARGB(255, 47, 156, 228)),
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                )
              ),
              value: _profession,
              onChanged: (value) {_profession = value!;},
              items: const [
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
              decoration: InputDecoration(
                labelText: "Pekerjaan",
                filled: true,
                fillColor: Colors.white,
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                  borderSide: BorderSide(width: 1,color: Color.fromARGB(255, 47, 156, 228)),
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                )
              ),
              onChanged: (value) {_title = value;},
          )),

          Padding(
            padding: const EdgeInsets.all(12),
            child: TextFormField(
              decoration: InputDecoration(
                labelText: "Lokasi",
                fillColor: Colors.white,
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                  borderSide: BorderSide(width: 1,color: Color.fromARGB(255, 47, 156, 228)),
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                )
              ),
              onChanged: (value) {_location = value;},
          )),

          Padding(
            padding: const EdgeInsets.all(12),
            child: TextFormField(
              decoration: InputDecoration(
                labelText: "Perusahaan",
                filled: true,
                fillColor: Colors.white,
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                  borderSide: BorderSide(width: 1,color: Color.fromARGB(255, 47, 156, 228)),
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                )
              ),
              onChanged: (value) {_company = value;},
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
                  borderSide: BorderSide(width: 1,color: Color.fromARGB(255, 47, 156, 228)),
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                )
              ),
              readOnly: true,
              controller: dateController,
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
                  backgroundColor: Color.fromARGB(255, 47, 156, 228),
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
          color: Colors.white
        ),
        title: const Text(
          "EAI Job Scrapper",
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Color.fromARGB(255, 47, 156, 228),
      ),
      body: Center(
        child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topRight,
              end: Alignment.bottomLeft,
              colors: [
                Colors.white,
                Color.fromARGB(255, 47, 156, 228),
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
                      backgroundColor: Color.fromARGB(255, 47, 156, 228),
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

              ..._jobsData.map((JobDataModel e) => Card(
                  child: Padding(
                    padding: EdgeInsets.all(20),
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
              ).toList(),

              Visibility(
                visible: _hasNoResult,
                child: const Center(
                  child: Text(
                    "Tidak ditemukan pekerjaan terkait",
                    style: TextStyle(
                      color: Color.fromARGB(255, 47, 156, 228), 
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
                    visible: _hasNextPage,
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

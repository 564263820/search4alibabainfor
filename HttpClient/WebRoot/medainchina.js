/* TODO For Complliance with Obtrusive Codes so keep some functions in HEAD */
2function showMore(name) {
3 document.getElementById(name).className = document.getElementById(name).className.replace("catlist", "catlist allCats")
4}
5
6function hide(note) {
7 document.getElementById(note).className = "hiden";
8}
9
10function cmdSubmit(pForm, pAction, pCode, pPage, pOrder) {
11 var form = document.getElementById("form2");
12 if (pForm != null)
13 form = pForm;
14 if (pAction != "" && form.action)
15 form.action.value = pAction;
16 if (pPage != "" && form.page)
17 form.page.value = pPage;
18 if (pOrder != "" && form.order)
19 form.order.value = pOrder;
20 if (pCode != "" && form.code)
21 form.code.value = pCode;
22 form.submit()
23}
24
25function cmdUnfurl(pForm, pComName, pComCode, pSubCode, pPage) {
26 var form = document.getElementById("form2");
27 if (pForm != null)
28 form = pForm;
29 form.action.value = "show";
30 if (pComName != "" && form.comName)
31 form.comName.value = pComName;
32 if (pComCode != "" && form.comCode)
33 form.comCode.value = pComCode;
34 if (pSubCode != "" && form.subCode)
35 form.subCode.value = pSubCode;
36 if (pPage != "" && form.page)
37 form.page.value = pPage;
38 form.submit()
39}
40
41function submitSearchByPage(page) {
42 var form = document.getElementById("SearchExtension");
43 if (!form) {
44 return
45 }
46 form.elements["page"].value = page;
47 form.submit()
48}
49
50function submitSearchByView(type) {
51 var form = document.getElementById("SearchExtension");
52 if (!form) {
53 return
54 }
55 form.viewType.value = type;
56 if ("1" == form.viewType.value) {
57 form.size.value = "30"
58 }
59 else if ("3" == form.viewType.value) {
60 form.size.value = "36"
61 }
62 else {
63 form.size.value = "40"
64 }
65 form.page.value = "1";
66 form.submit()
67}
68
69function submitSearchBySize(val) {
70 var form = document.getElementById("SearchExtension");
71 if (!form) {
72 return
73 }
74 form.size.value = val;
75 if (form.size.value == "30") {
76 form.sizeHasChanged.value = "1"
77 }
78 form.page.value = "1";
79 form.submit()
80}
81
82function submitSearchByOrder(order) {
83 var form = document.getElementById("SearchExtension");
84 if (!form) {
85 return
86 }
87 form.elements["order"].value = order;
88 form.elements["page"].value = "1";
89 form.submit()
90}
91
92function submitSearchByRoot(code) {
93 var form = document.getElementById("SearchExtension");
94 if (!form) {
95 return
96 }
97 form.elements["code"].value = code;
98 form.elements["page"].value = '1';
99 form.submit();
100 return false
101}
102
103function Show_TabADSMenu(tabadid_num, tabadnum) {
104 clearAll();
105 document.getElementById("tabadmenu_" + tabadid_num + "0").style.display = "none";
106 document.getElementById("tabadcontent_" + tabadid_num + tabadnum).style.display = "block";
107 document.getElementById("tabadcontent_" + tabadid_num + tabadnum).style.clear = "both";
108 if (tabadnum > 0) {
109 document.getElementById("tabadmenu_" + tabadid_num + "0").style.display = "block";
110 document.getElementById("lessviewid_" + tabadid_num + "0").className = "moreview"
111 }
112 else {
113 document.getElementById("tabadmenu_" + tabadid_num + "1").style.display = "block";
114 document.getElementById("tabadmenu_" + tabadid_num + "2").style.display = "block";
115 document.getElementById("lessviewid_" + tabadid_num + "0").className = "lessview"
116 }
117 document.getElementById("tabadcontent_" + tabadid_num + tabadnum).style.display = "block";
118 if (window.addEventListener) {
119 document.addEventListener("click", checkForClose, true)
120 }
121 else if (window.attachEvent) {
122 setTimeout(function() {
123 document.attachEvent("onclick", checkForClose)
124 }, 50)
125 }
126}
127
128function clearAll() {
129 for (var j = 1; j < 4; j++) {
130 for (var i = 0; i < 2; i++) {
131 if (null != document.getElementById("tabadcontent_" + j + i)) {
132 document.getElementById("tabadcontent_" + j + i).style.display = "none"
133 }
134 }
135 for (var i = 0; i < 3; i++) {
136 if (null != document.getElementById("tabadmenu_" + j + i)) {
137 document.getElementById("tabadmenu_" + j + i).style.display = "none"
138 }
139 }
140 if (null != document.getElementById("tabadmenu_" + j + "0"))
141 document.getElementById("tabadmenu_" + j + "0").style.display = "block";
142 if (null != document.getElementById("lessviewid_" + j + "0"))
143 document.getElementById("lessviewid_" + j + "0").className = "moreview"
144 }
145}
146
147function checkForClose(e) {
148 var evt = e || window.event;
149 var oThis = evt.target || evt.srcElement;
150 while (oThis && oThis.id != "tabadcontent_20" && oThis.nodeName.toLowerCase() != "body") {
151 oThis = oThis.parentNode
152 }
153 if (oThis && oThis.id != "tabadcontent_20") {
154 clearAll();
155 if (window.removeEventListener) {
156 document.removeEventListener("click", checkForClose, true)
157 }
158 else if (window.detachEvent) {
159 setTimeout(function() {
160 document.detachEvent("onclick", checkForClose)
161 }, 50)
162 }
163 }
164}
165
166function submitSearch(type, value) {
167 var comForm = document.getElementById("SearchExtension");
168 if (!comForm) {
169 return
170 }
171 var viewMoreOrLess = document.getElementById("viewMoreOrLess");
172 if (viewMoreOrLess) {
173 comForm.viewMoreOrLessClass.value = viewMoreOrLess.className;
174 }
175 if (type == "sgs") {
176 comForm.asFlag.value = value;
177 comForm.page.value = "1";
178 document.getElementById("sgs").className = "on";
179 comForm.submit()
180 }
181 else {
182 if (type == "level") {
183 comForm.memberLevel.value = value;
184 comForm.page.value = "1";
185 document.getElementById("level" + value).className = "on";
186 comForm.submit()
187 }
188 else {
189 if (type == "province") {
190 comForm.comProvince.value = value;
191 comForm.page.value = "1";
192 comForm.submit()
193 }
194 else {
195 if (type == "catalog") {
196 comForm.code.value = value;
197 comForm.page.value = "1";
198 comForm.submit()
199 }
200 else {
201 if (type == "prod_prop_set") {
202 comForm.propertyValues.value = value;
203 comForm.page.value = "1";
204 comForm.submit()
205 }
206 else {
207 if (type == "trade_markets") {
208 comForm.toTradeMarkets.value = value;
209 comForm.page.value = "1";
210 comForm.submit()
211 }
212 }
213 }
214 }
215 }
216 }
217}
218
219function undoSearchForCat(code) {
220 var comForm = document.getElementById("SearchExtension");
221 if (!comForm) {
222 return
223 }
224 var viewMoreOrLess = document.getElementById("viewMoreOrLess");
225 if (viewMoreOrLess) {
226 comForm.viewMoreOrLessClass.value = viewMoreOrLess.className;
227 }
228 comForm.code.value = code;
229 comForm.propertyValues.value = "";
230 comForm.page.value = "1";
231 comForm.submit()
232}
233
234function undoSearchForProperty(values) {
235 var comForm = document.getElementById("SearchExtension");
236 if (!comForm) {
237 return
238 }
239 var viewMoreOrLess = document.getElementById("viewMoreOrLess");
240 if (viewMoreOrLess) {
241 comForm.viewMoreOrLessClass.value = viewMoreOrLess.className;
242 }
243 comForm.propertyValues.value = values;
244 comForm.page.value = "1";
245 comForm.submit()
246}
247
248function undoSearch(conditionType) {
249 var comForm = document.getElementById("SearchExtension");
250 if (!comForm) {
251 return
252 }
253 var viewMoreOrLess = document.getElementById("viewMoreOrLess");
254 if (viewMoreOrLess) {
255 comForm.viewMoreOrLessClass.value = viewMoreOrLess.className;
256 }
257 if (conditionType == "sgs") {
258 comForm.asFlag.value = "";
259 comForm.page.value = "1";
260 comForm.submit()
261 }
262 else {
263 if (conditionType == "level") {
264 comForm.memberLevel.value = "";
265 comForm.page.value = "1";
266 comForm.submit()
267 }
268 else {
269 if (conditionType == "province") {
270 comForm.comProvince.value = "";
271 comForm.page.value = "1";
272 comForm.submit()
273 }
274 else {
275 if (conditionType == "") {
276 comForm.asFlag.value = "";
277 comForm.memberLevel.value = "";
278 comForm.propertyValues.value = "";
279 comForm.comProvince.value = "";
280 comForm.code.value = "0";
281 comForm.toTradeMarkets.value = "";
282 comForm.page.value = "1";
283 comForm.submit()
284 }
285 else {
286 if (conditionType == "trade_markets") {
287 comForm.toTradeMarkets.value = "";
288 comForm.page.value = "1";
289 comForm.submit()
290 }
291 }
292 }
293 }
294 }
295} 
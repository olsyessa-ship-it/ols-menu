const { put, list, del } = require('@vercel/blob');
const PIN = '126019';
const BLOB_KEY = 'ols-menu-data.json';

const DEF={categories:[{id:"poke",ar:"بوكي بول",en:"Poke Bowls",order:1},{id:"protein",ar:"بروتين بولز",en:"Protein Bowls",order:2},{id:"tortilla",ar:"تورتيلا",en:"Tortilla",order:3},{id:"salad",ar:"سلطات وأكثر",en:"Salads & More",order:4}],allergens:{gluten:{icon:"",ar:"جلوتين",en:"Gluten"},dairy:{icon:"",ar:"حليب ومشتقاته",en:"Dairy"},seafood:{icon:"",ar:"قشريات",en:"Crustaceans"},soy:{icon:"",ar:"فول الصويا",en:"Soybeans"},eggs:{icon:"",ar:"بيض",en:"Eggs"},nuts:{icon:"",ar:"مكسرات",en:"Tree Nuts"},mushroom:{icon:"",ar:"فطر",en:"Mushroom"},fish:{icon:"",ar:"أسماك",en:"Fish"},mustard:{icon:"",ar:"خردل",en:"Mustard"},sesame:{icon:"",ar:"سمسم",en:"Sesame"}},sauces:{
"spicy":{ar:"سبايسي",en:"Spicy",icon:"",allergens:["eggs","soy"],cal:228,serve:50,desc:{ar:"صوص حار بلمسة مدخنة وعمق من صويا محمصة",en:"A bold hot sauce with a smoky edge and roasted soy depth"}},
"creamy-pesto":{ar:"كريمي بيستو",en:"Creamy Pesto",icon:"",allergens:["eggs","fish","nuts","mustard"],cal:243,serve:50,desc:{ar:"كريمة غنية بالريحان مع لمسة مكسرات ونكهة خردل خفية",en:"Rich basil cream with a nutty finish and a subtle mustard note"}},
"smoky-lime":{ar:"سموكي لايم",en:"Smoky Lime",icon:"",allergens:["eggs","fish","soy"],cal:239,serve:50,desc:{ar:"حموضة الليمون مع دخان خفيف ولمسة صويا متوازنة",en:"Bright lime citrus with a light smoky touch and balanced soy"}},
"sweet-maple":{ar:"سويت ميبل",en:"Sweet Maple",icon:"",allergens:["eggs","dairy"],cal:243,serve:50,desc:{ar:"حلاوة الميبل الطبيعية مع كريمة ناعمة ولمسة خفيفة من الخل",en:"Natural maple sweetness with smooth cream and a light vinegar lift"}},
"tangy-dijon":{ar:"تانقي ديجون",en:"Tangy Dijon",icon:"",allergens:["eggs","soy","mustard"],cal:227,serve:50,desc:{ar:"حدة الديجون مع حموضة خفيفة ونكهة خردل مميزة",en:"Sharp Dijon kick with a tangy edge and distinct mustard character"}},
"thousand-island":{ar:"ثاوزند آيلاند",en:"Thousand Island",icon:"",allergens:["eggs"],cal:200,serve:50,desc:{ar:"صوص كلاسيكي كريمي بنكهة حلوة وحامضة",en:"Classic creamy sauce with a sweet and tangy flavor"}},
"pomegranate-molasses":{ar:"دبس رمان",en:"Pomegranate Molasses",icon:"",allergens:[],cal:90,serve:50,desc:{ar:"دبس رمان طبيعي بحموضة غنية وحلاوة خفيفة",en:"Natural pomegranate molasses with rich tartness and mild sweetness"}},
"ranch":{ar:"رانش",en:"Ranch",icon:"",allergens:["dairy","eggs"],cal:260,serve:50,desc:{ar:"صوص كريمي كلاسيكي بالأعشاب",en:"Classic creamy herb dressing"}},
"diet-ranch":{ar:"رانش دايت",en:"Diet Ranch",icon:"",allergens:["dairy"],cal:120,serve:50,desc:{ar:"نسخة خفيفة من الرانش بسعرات أقل",en:"A lighter ranch with fewer calories"}}
},byb:{
enabled:true,
proteins:[
{id:"chicken",ar:"دجاج",en:"Chicken",price:35,icon:"🍗"},
{id:"beef",ar:"لحم",en:"Beef",price:43,icon:"🥩"},
{id:"shrimp",ar:"روبيان",en:"Shrimp",price:59,icon:"🦐"}
],
carbs:[
{id:"sushi-rice",ar:"رز سوشي",en:"Sushi Rice",icon:"🍚"},
{id:"brown-rice",ar:"رز بني",en:"Brown Rice",icon:"🍚"},
{id:"white-rice",ar:"رز أبيض",en:"White Rice",icon:"🍚"}
],
veggies:[
{id:"lettuce",ar:"خس",en:"Lettuce",icon:"🥬"},
{id:"cucumber",ar:"خيار",en:"Cucumber",icon:"🥒"},
{id:"corn",ar:"ذرة",en:"Corn",icon:"🌽"},
{id:"broccoli",ar:"بروكلي",en:"Broccoli",icon:"🥦"},
{id:"carrot",ar:"جزر",en:"Carrot",icon:"🥕"},
{id:"cabbage",ar:"ملفوف",en:"Cabbage",icon:"🥗"},
{id:"pomegranate",ar:"رمان",en:"Pomegranate",icon:"💎"},
{id:"cherry-tomato",ar:"طماطم شيري",en:"Cherry Tomato",icon:"🍅"},
{id:"edamame",ar:"إدامامي",en:"Edamame",icon:"🫛"},
{id:"beetroot",ar:"شمندر",en:"Beetroot",icon:"🟣"}
],
maxVeggies:3,
extras:{carb:{ar:"سكوب كارب إضافي",en:"Extra Carb Scoop",price:5},protein:{ar:"سكوب بروتين إضافي",en:"Extra Protein Scoop",price:15}},
cheese:[{id:"none",ar:"بدون",en:"None",icon:"—"},{id:"halloumi",ar:"حلوم",en:"Halloumi",icon:"🧀"},{id:"feta",ar:"فيتا",en:"Feta",icon:"🧀"}],
sauces:["spicy","creamy-pesto","smoky-lime","sweet-maple","tangy-dijon","thousand-island","pomegranate-molasses","ranch","diet-ranch"],
garnish:[{id:"pumpkin-seeds",ar:"بذور قرع",en:"Pumpkin Seeds",icon:"🎃"},{id:"sesame",ar:"سمسم",en:"Sesame Seeds",icon:"⚪"},{id:"walnuts",ar:"جوز",en:"Walnuts",icon:"🥜",allergens:["nuts"]}],
scoopNote:{ar:"السكوب الواحد يتراوح بين ١٠٠-١٢٠ جرام",en:"Each scoop is approximately 100-120g"}
},items:[
{id:"shrimp-crunch",category:"poke",cookType:"fry",image:"/Shrimp-Crunch-New.png",name:{ar:"شريمب كرانش بوكي بول",en:"Shrimp Crunch Poke Bowl"},description:{ar:"روبيان مقلي مقرمش على رز سوشي مع مانجو، ذرة محمصة، كراب ستيك، خيار، جواكمولي ورمان",en:"Crispy fried shrimp over sushi rice with mango, roasted corn, crab stick, cucumber, guacamole & pomegranate"},price:38,priceLabel:null,allergens:["seafood","soy","gluten"],ingredients:{ar:["رز سوشي","روبيان مقلي","ملفوف بالصويا","رمان","ذرة محمصة","خيار","مانجو","جواكمولي","كراب ستيك"],en:["Sushi Rice","Fried Shrimp","Soy Cabbage","Pomegranate","Roasted Corn","Cucumber","Mango","Guacamole","Crab Stick"]},macros:{cal:853,protein:33,carbs:100,fat:36},available:true,hiddenUntil:null,order:2,sauce:"spicy,smoky-lime"},
{id:"shrimp-escape",category:"poke",cookType:"grill",image:"/Grill-SHrimp.png",name:{ar:"شريمب جريل بوكي بول",en:"Shrimp Grill Poke Bowl"},description:{ar:"روبيان مشوي على رز سوشي مع أناناس مشوي، بروكلي، كراب ستيك، خيار، خس وجواكمولي",en:"Grilled shrimp over sushi rice with grilled pineapple, broccoli, crab stick, cucumber, lettuce & guacamole"},price:42,priceLabel:null,allergens:["seafood","soy"],ingredients:{ar:["رز سوشي","روبيان مشوي","أناناس مشوي","بروكلي","كراب ستيك","خيار","خس","جواكمولي"],en:["Sushi Rice","Grilled Shrimp","Grilled Pineapple","Broccoli","Crab Stick","Cucumber","Lettuce","Guacamole"]},macros:{cal:696,protein:36,carbs:79,fat:26},available:true,hiddenUntil:null,order:3,sauce:"spicy,sweet-maple"},
{id:"cheat-treat",category:"poke",cookType:"fry",image:"/Chicken-Crunch.png",name:{ar:"تشيكن كرانش بوكي بول",en:"Chicken Crunch Poke Bowl"},description:{ar:"دجاج مقلي مقرمش على رز سوشي مع طماطم شيري، ذرة محمصة، جزر، رمان، خس وجواكمولي",en:"Crispy fried chicken over sushi rice with cherry tomatoes, roasted corn, carrot, pomegranate, lettuce & guacamole"},price:32,priceLabel:null,allergens:["gluten","soy"],ingredients:{ar:["رز سوشي","دجاج مقلي","طماطم شيري","ملفوف","جواكمولي","جزر","خس","رمان","ذرة محمصة"],en:["Sushi Rice","Fried Chicken","Cherry Tomatoes","Cabbage","Guacamole","Carrot","Lettuce","Pomegranate","Roasted Corn"]},macros:{cal:813,protein:37,carbs:94,fat:34},available:true,hiddenUntil:null,order:4,sauce:"spicy,smoky-lime"},
{id:"grilled-gain",category:"poke",cookType:"grill",image:"/Grill-Chicken.png",name:{ar:"جريلد تشيكن بوكي بول",en:"Grilled Chicken Poke Bowl"},description:{ar:"دجاج مشوي على رز سوشي مع ذرة محمصة، جزر، رمان، خيار، خس وجواكمولي",en:"Grilled chicken over sushi rice with roasted corn, carrot, pomegranate, cucumber, lettuce & guacamole"},price:34,priceLabel:null,allergens:["soy"],ingredients:{ar:["رز سوشي","دجاج مشوي","خس","ملفوف بالصويا","ذرة محمصة","جزر","رمان","خيار","جواكمولي"],en:["Sushi Rice","Grilled Chicken","Lettuce","Soy Cabbage","Roasted Corn","Carrot","Pomegranate","Cucumber","Guacamole"]},macros:{cal:795,protein:48,carbs:86,fat:29},available:true,hiddenUntil:null,order:5,sauce:"spicy,tangy-dijon,sweet-maple"},
{id:"beef-bowl",category:"poke",cookType:"grill",image:"/Smooky-Beef.png",name:{ar:"سموكي بيف بوكي بول",en:"Smoky Beef Poke Bowl"},description:{ar:"شرائح لحم طرية على رز سوشي مع طماطم شيري، إدامامي، قرنبيط، خس وملفوف",en:"Tender beef strips over sushi rice with cherry tomatoes, edamame, cauliflower, lettuce & cabbage"},price:38,priceLabel:null,allergens:["soy"],ingredients:{ar:["رز سوشي","شرائح لحم","طماطم شيري","ملفوف","إدامامي","خس","قرنبيط"],en:["Sushi Rice","Beef Strips","Cherry Tomatoes","Cabbage","Edamame","Lettuce","Cauliflower"]},macros:{cal:741,protein:45,carbs:72,fat:29},available:true,hiddenUntil:null,order:6,sauce:"spicy,creamy-pesto,smoky-lime"},
{id:"salmon-flame",category:"poke",cookType:"grill",image:"/Salmon-Flame.png",name:{ar:"سالمون فلايم بوكي بول",en:"Salmon Flame Poke Bowl"},description:{ar:"سالمون مشوي على الحجر فوق رز سوشي مع بروكلي، جزر، إدامامي، كراب ستيك وملفوف بالصويا",en:"Stone-grilled salmon over sushi rice with broccoli, carrot, edamame, crab stick & soy cabbage"},price:59,priceLabel:null,allergens:["fish","soy","seafood"],ingredients:{ar:["رز سوشي","سالمون مشوي","بروكلي","جزر","إدامامي","كراب ستيك","ملفوف بالصويا"],en:["Sushi Rice","Grilled Salmon","Broccoli","Carrot","Edamame","Crab Stick","Soy Cabbage"]},macros:{cal:742,protein:37,carbs:76,fat:30},available:true,hiddenUntil:null,order:7,sauce:"spicy,sweet-maple"},
{id:"buffalo-chicken",category:"protein",cookType:"fry",image:"/%D8%AF%D8%AC%D8%A7%D8%AC%20%D8%A7%D9%84%D8%A8%D8%A7%D9%81%D9%84%D9%88.jpg",name:{ar:"دجاج البافلو",en:"Buffalo Chicken"},description:{ar:"دجاج مقلي مقرمش بصوص بافلو أحمر على الأرز الأبيض بطعم جريء ولاذع",en:"Crispy fried chicken in red buffalo sauce over white rice for a bold, tangy crunch"},price:30,priceLabel:null,allergens:["gluten","dairy"],ingredients:{ar:["دجاج مقلي","صوص بافلو","ثوم","زيت زيتون","زبدة","توابل مشكلة"],en:["Fried Chicken","Buffalo Sauce","Garlic","Olive Oil","Butter","Mixed Spices"]},macros:{cal:450,protein:35,carbs:38,fat:18},available:true,hiddenUntil:null,order:1,badge:null},
{id:"lemon-chicken",category:"protein",cookType:"grill",image:"/%D8%AF%D8%AC%D8%A7%D8%AC%20%D8%A7%D9%84%D9%84%D9%8A%D9%85%D9%88%D9%86.jpg",name:{ar:"دجاج الليمون",en:"Lemon Chicken"},description:{ar:"دجاج بصوص ليمون خفيف على الأرز الأبيض بنكهة منعشة ومتوازنة",en:"Tender chicken in light lemon sauce over white rice for a refreshing, balanced flavor"},price:26,priceLabel:null,allergens:["dairy"],ingredients:{ar:["دجاج مشوي","عصير ليمون","زيت زيتون","ثوم","كريمة طهي","توابل مشكلة"],en:["Grilled Chicken","Lemon Juice","Olive Oil","Garlic","Cooking Cream","Mixed Spices"]},macros:{cal:420,protein:38,carbs:32,fat:16},available:true,hiddenUntil:null,order:2},
{id:"bbq-chicken",category:"protein",cookType:"grill",image:"/%D8%AF%D8%AC%D8%A7%D8%AC%20%D8%A7%D9%84%D8%A8%D8%A7%D8%B1%D8%A8%D9%83%D9%8A%D9%88.jpg",name:{ar:"دجاج الباربكيو",en:"BBQ Chicken"},description:{ar:"دجاج طري بصوص باربكيو غني على الأرز الأبيض بنكهة حلوة ومدخنة",en:"Juicy chicken in rich barbecue sauce over white rice with a sweet, smoky flavor"},price:26,priceLabel:null,allergens:[],ingredients:{ar:["دجاج مشوي","صوص باربكيو","ثوم","زيت زيتون","توابل مدخنة"],en:["Grilled Chicken","BBQ Sauce","Garlic","Olive Oil","Smoked Spices"]},macros:{cal:440,protein:36,carbs:42,fat:14},available:true,hiddenUntil:null,order:3},
{id:"mushroom-chicken",category:"protein",cookType:"grill",image:"/%D8%AF%D8%AC%D8%A7%D8%AC%20%D8%A7%D9%84%D9%85%D8%A7%D8%B4%D8%B1%D9%88%D9%85%28%D8%A7%D9%84%D9%81%D8%B7%D8%B1%29.jpg",name:{ar:"دجاج الفطر",en:"Mushroom Chicken"},description:{ar:"دجاج بصوص مشروم كريمي على الأرز الأبيض بطعم ناعم ومريح",en:"Chicken in creamy mushroom sauce over white rice for a smooth, comforting flavor"},price:26,priceLabel:null,allergens:["dairy","mushroom"],ingredients:{ar:["دجاج مشوي","فطر طازج","كريمة طهي","زيت زيتون","ثوم","توابل مشكلة"],en:["Grilled Chicken","Fresh Mushroom","Cooking Cream","Olive Oil","Garlic","Mixed Spices"]},macros:{cal:430,protein:37,carbs:30,fat:18},available:true,hiddenUntil:null,order:4},
{id:"beef-mushroom",category:"protein",cookType:"grill",image:"/%D9%84%D8%AD%D9%85%20%D8%A7%D9%84%D9%81%D8%B7%D8%B1.jpg",name:{ar:"لحم بالفطر",en:"Beef Mushroom"},description:{ar:"شرائح لحم بصوص مشروم كريمي على الأرز الأبيض بطعم غني ومريح",en:"Tender beef strips in creamy mushroom sauce over white rice for a rich, comforting flavor"},price:35,priceLabel:null,allergens:["dairy","mushroom","soy"],ingredients:{ar:["لحم بقري شرائح","فطر طازج","كريمة طهي","زيت زيتون","ثوم","توابل مشكلة"],en:["Beef Strips","Fresh Mushroom","Cooking Cream","Olive Oil","Garlic","Mixed Spices"]},macros:{cal:520,protein:42,carbs:35,fat:24},available:true,hiddenUntil:null,order:5},
{id:"beef-mongolian",category:"protein",cookType:"grill",image:"/%D9%85%D8%A7%D9%86%D8%BA%D9%88%D9%84%D9%8A%D8%A7.png",name:{ar:"لحم مانغوليا",en:"Mongolian Beef"},description:{ar:"شرائح لحم بصوص مانغوليا الآسيوي الحلو المالح على الأرز الأبيض",en:"Beef strips in sweet-savory Mongolian sauce over white rice"},price:35,priceLabel:null,allergens:["soy"],ingredients:{ar:["لحم بقري شرائح","صوص مانغوليا","بصل أخضر","ثوم","زنجبيل","زيت زيتون"],en:["Beef Strips","Mongolian Sauce","Spring Onion","Garlic","Ginger","Olive Oil"]},macros:{cal:510,protein:40,carbs:42,fat:20},available:true,hiddenUntil:null,order:6},
{id:"shrimp-buffalo",category:"protein",cookType:"fry",image:"/%D8%B1%D9%88%D8%A8%D9%8A%D8%A7%D9%86%20%D8%A7%D9%84%D8%A8%D8%A7%D9%81%D9%84%D9%88.jpg",name:{ar:"روبيان بافلو",en:"Buffalo Shrimp"},description:{ar:"روبيان مقلي مقرمش بصوص بافلو حار على الأرز الأبيض بطعم جريء ولاذع",en:"Crispy fried shrimp in hot buffalo sauce over white rice for a bold, tangy crunch"},price:40,priceLabel:null,allergens:["seafood","gluten","dairy"],ingredients:{ar:["روبيان مقلي","صوص بافلو","ثوم","زيت زيتون","زبدة","توابل مشكلة"],en:["Fried Shrimp","Buffalo Sauce","Garlic","Olive Oil","Butter","Mixed Spices"]},macros:{cal:480,protein:32,carbs:38,fat:22},available:true,hiddenUntil:null,order:7},
{id:"tortilla-chicken",category:"tortilla",cookType:"grill",image:"/%D8%AA%D9%88%D8%B1%D8%AA%D9%8A%D9%84%D8%A7%20%D8%A7%D9%84%D8%AF%D8%AC%D8%A7%D8%AC.jpg",name:{ar:"تورتيلا الدجاج",en:"Chicken Tortilla"},description:{ar:"دجاج مطهو مع فلفل بارد وتوابل خاصة وصوص محار ولمسة جبن ذائب. يحتوي على فطر",en:"Tender chicken sautéed with bell peppers, special spices, oyster sauce, and melted cheese. Contains mushrooms"},price:29,priceLabel:null,allergens:["gluten","dairy","mushroom"],ingredients:{ar:["دجاج","فطر","جبنة شيدر","جبنة موزاريلا","زيت زيتون","ثوم","فلفل رومي","توابل مشكلة","تورتيلا"],en:["Chicken","Mushroom","Cheddar","Mozzarella","Olive Oil","Garlic","Bell Pepper","Mixed Spices","Tortilla Wrap"]},macros:{cal:480,protein:34,carbs:38,fat:22},available:true,hiddenUntil:null,order:1},
{id:"tortilla-beef",category:"tortilla",cookType:"grill",image:"/%D8%AA%D9%88%D8%AA%D9%8A%D9%84%D8%A7%20%D8%A7%D9%84%D9%84%D8%AD%D9%85.jpg",name:{ar:"تورتيلا اللحم",en:"Beef Tortilla"},description:{ar:"تورتيلا لحم طري مع فلفل بارد وبهارات خاصة وصوص محار ولمسة جبن ذائب. يحتوي على فطر",en:"Juicy beef with bell peppers, special spices, oyster sauce, and melted cheese. Contains mushrooms"},price:33,priceLabel:null,allergens:["gluten","dairy","mushroom"],ingredients:{ar:["لحم بقري","فطر","جبنة شيدر","جبنة موزاريلا","زيت زيتون","ثوم","فلفل رومي","توابل مشكلة","تورتيلا"],en:["Beef","Mushroom","Cheddar","Mozzarella","Olive Oil","Garlic","Bell Pepper","Mixed Spices","Tortilla Wrap"]},macros:{cal:530,protein:38,carbs:36,fat:26},available:true,hiddenUntil:null,order:2},
{id:"tortilla-buffalo-chicken",category:"tortilla",cookType:"fry",image:"/%D8%AA%D9%88%D8%B1%D8%AA%D9%8A%D9%84%D8%A7%20%D8%A8%D8%A7%D9%81%D9%84%D9%88%20%D8%A7%D9%84%D8%AF%D8%AC%D8%A7%D8%AC.jpg.avif",name:{ar:"تورتيلا بافلو دجاج",en:"Buffalo Chicken Tortilla"},description:{ar:"تورتيلا محشية بدجاج البافلو الحار مع خس طازج وصلصة الرانش",en:"Tortilla wrap filled with buffalo chicken, fresh lettuce and ranch sauce"},price:32,priceLabel:null,allergens:["gluten","dairy"],ingredients:{ar:["دجاج مقلي","صوص بافلو","خس","رانش","تورتيلا"],en:["Fried Chicken","Buffalo Sauce","Lettuce","Ranch","Tortilla Wrap"]},macros:{cal:510,protein:30,carbs:42,fat:24},available:true,hiddenUntil:null,order:3},
{id:"tortilla-buffalo-shrimp",category:"tortilla",cookType:"fry",image:"/%D8%AA%D9%88%D8%B1%D8%AA%D9%8A%D9%84%D8%A7%20%D8%A8%D8%A7%D9%81%D9%84%D9%88%20%D8%A7%D9%84%D8%B1%D9%88%D8%A8%D9%8A%D8%A7%D9%86.jpg.avif",name:{ar:"تورتيلا بافلو روبيان",en:"Buffalo Shrimp Tortilla"},description:{ar:"تورتيلا محشية بالروبيان البافلو الحار مع خس طازج وصلصة الرانش",en:"Tortilla wrap filled with buffalo shrimp, fresh lettuce and ranch sauce"},price:39,priceLabel:null,allergens:["gluten","seafood","dairy"],ingredients:{ar:["روبيان مقلي","صوص بافلو","خس","رانش","تورتيلا"],en:["Fried Shrimp","Buffalo Sauce","Lettuce","Ranch","Tortilla Wrap"]},macros:{cal:490,protein:28,carbs:40,fat:22},available:true,hiddenUntil:null,order:4},
{id:"shrimp-salad",category:"salad",cookType:"grill",image:"/%D8%B3%D9%84%D8%B7%D8%A9%20%D8%A7%D9%84%D8%B1%D9%88%D8%A8%D9%8A%D8%A7%D9%86%20.jpg",name:{ar:"سلطة الروبيان",en:"Shrimp Light Salad"},description:{ar:"روبيان مشوي، خس، خيار، زيتون أسود، عصير ليمون",en:"Grilled shrimp, lettuce, cucumber, black olives, lemon juice"},price:34,priceLabel:null,allergens:["seafood"],ingredients:{ar:["روبيان مشوي","خس","خيار","زيتون أسود","عصير ليمون"],en:["Grilled Shrimp","Lettuce","Cucumber","Black Olives","Lemon Juice"]},macros:{cal:280,protein:30,carbs:12,fat:14},available:true,hiddenUntil:null,order:1},
{id:"crab-salad",category:"salad",cookType:"fry",image:"/%D9%83%D8%B1%D8%A7%D8%A8%20%D9%83%D8%B1%D8%A7%D9%86%D8%B4%20%D8%B3%D9%84%D8%B7%D8%A9.jpg",name:{ar:"سلطة كراب كرنش",en:"Crab Crunch Salad"},description:{ar:"سلطة كراب كرنش مع شمندر، خس، جزر، ملفوف، خبز مقرمش، سريراتشا ومايونيز ياباني",en:"Crab crunch salad with beetroot, lettuce, carrot, cabbage, crispy bread, sriracha & Japanese mayo"},price:32,priceLabel:null,allergens:["seafood","eggs"],ingredients:{ar:["كراب","خس","ملفوف","شمندر","جزر","خبز مقرمش","سيراتشا","مايونيز ياباني"],en:["Crab","Lettuce","Cabbage","Beetroot","Carrot","Crispy Bread","Sriracha","Japanese Mayo"]},macros:{cal:320,protein:22,carbs:18,fat:18},available:true,hiddenUntil:null,order:2}
]};

// ═══ WRITE to Vercel Blob ═══
async function saveData(d) {
  try {
    const blob = await put(BLOB_KEY, JSON.stringify(d), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json'
    });
    console.log('✅ Saved to blob:', blob.url);
    return blob;
  } catch(e) {
    console.error('❌ Blob save error:', e.message);
    throw e;
  }
}

// ═══ READ from Vercel Blob ═══
async function getData() {
  try {
    // List blobs to find our file
    const { blobs } = await list({ prefix: BLOB_KEY });
    console.log('Blob list:', blobs.length, 'found');
    
    if (blobs.length > 0) {
      // Found it — fetch the URL directly
      const blobUrl = blobs[0].url;
      console.log('Reading from:', blobUrl);
      const res = await fetch(blobUrl);
      if (res.ok) {
        const d = await res.json();
        // Auto-unhide expired items
        const now = Date.now();
        let changed = false;
        (d.items || []).forEach(i => {
          if (i.hiddenUntil && now > i.hiddenUntil) {
            i.available = true;
            i.hiddenUntil = null;
            changed = true;
          }
        });
        if (changed) await saveData(d);
        return d;
      }
    }
    
    // No blob found — first run, seed the defaults
    console.log('No blob found, seeding defaults...');
    await saveData(DEF);
    return JSON.parse(JSON.stringify(DEF));
    
  } catch (e) {
    console.error('❌ Blob read error:', e.message);
    return JSON.parse(JSON.stringify(DEF));
  }
}

// ═══ API Handler ═══
module.exports = async function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-pin');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const admin = req.headers['x-pin'] === PIN;
  const url = req.url || '';

  try {
    if (req.method === 'GET') {
      const d = await getData();
      if (url.includes('/all')) {
        if (!admin) return res.status(403).json({ error: 'denied' });
        return res.json(d);
      }
      return res.json({
        categories: d.categories,
        allergens: d.allergens,
        items: (d.items || []).filter(i => i.available !== false)
      });
    }

    if (req.method === 'PUT') {
      if (!admin) return res.status(403).json({ error: 'denied' });
      const b = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      await saveData(b);
      return res.json({ ok: true });
    }
  } catch(e) {
    console.error('API error:', e);
    return res.status(500).json({ error: e.message });
  }

  res.status(405).end();
};

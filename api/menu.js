const { put, list, del } = require('@vercel/blob');
const PIN = '126019';
const BLOB_KEY = 'ols-menu-data.json';

const DEF={categories:[{id:"poke",ar:"بوكي بول",en:"Poke Bowls",order:1},{id:"protein",ar:"بروتين بولز",en:"Protein Bowls",order:2},{id:"tortilla",ar:"تورتيلا",en:"Tortilla",order:3},{id:"salad",ar:"سلطات وأكثر",en:"Salads & More",order:4}],allergens:{gluten:{icon:"🌾",ar:"جلوتين",en:"Gluten"},dairy:{icon:"🥛",ar:"ألبان",en:"Dairy"},seafood:{icon:"🦐",ar:"مأكولات بحرية",en:"Seafood"},soy:{icon:"🫘",ar:"صويا",en:"Soy"},eggs:{icon:"🥚",ar:"بيض",en:"Eggs"},nuts:{icon:"🥜",ar:"مكسرات",en:"Nuts"},mushroom:{icon:"🍄",ar:"فطر",en:"Mushroom"},fish:{icon:"🐟",ar:"سمك",en:"Fish"}},items:[
{id:"zaatar",category:"poke",cookType:"grill",image:"/images/zaatar.jpg",name:{ar:"زعتر كرانش",en:"Crunchy Za'atar Bowl"},description:{ar:"مكعبات البطاطس المقرمشة، دجاج مشوي، وأرز أبيض، مغطاة بخلطة الزعتر العطرية وزيت الزيتون الغني",en:"Crispy potato cubes, grilled chicken, and white rice topped with aromatic za'atar blend and rich olive oil"},price:29,priceLabel:null,allergens:["gluten"],ingredients:{ar:["أرز أبيض","دجاج مشوي","بطاطس مقرمشة","زعتر","زيت زيتون"],en:["White Rice","Grilled Chicken","Crispy Potato","Za'atar","Olive Oil"]},macros:{cal:520,protein:32,carbs:58,fat:18},available:true,hiddenUntil:null,order:1},
{id:"shrimp-crunch",category:"poke",cookType:"fry",image:"/images/shrimp-crunch.jpg",name:{ar:"شريمب كرانش",en:"Shrimp Crunch"},description:{ar:"رز أبيض، روبيان مقلي بالبانكو، صوص الصويا، سمسم، مانجو، ملفوف مشكل، رمان، جواكامولي وكراب",en:"White rice, panko fried shrimp, soy sauce, sesame, mango, mixed cabbage, pomegranate, guacamole and crab"},price:38,priceLabel:null,allergens:["seafood","soy","gluten"],ingredients:{ar:["رز سوشي","روبيان مقلي","ملفوف الصويا","رمان","ذرة","خيار","مانجو","جواكامولي","كراب","صوص أولس"],en:["Sushi Rice","Fried Shrimp","Soy Cabbage","Pomegranate","Corn","Cucumber","Mango","Guacamole","Crab","OLS Sauce"]},macros:{cal:580,protein:28,carbs:65,fat:22},available:true,hiddenUntil:null,order:2},
{id:"shrimp-escape",category:"poke",cookType:"grill",image:"/images/shrimp-escape.jpg",name:{ar:"شريمب إسكيب",en:"Shrimp Escape"},description:{ar:"رز أبيض، روبيان مشوي، صوص الصويا، سمسم، بروكلي، أناناس، خس، وكراب",en:"White rice, grilled shrimp, soy sauce, sesame seeds, broccoli, pineapple, lettuce, and crab"},price:42,priceLabel:null,allergens:["seafood","soy"],ingredients:{ar:["رز سوشي","روبيان مشوي","أناناس","بروكلي","كراب","خيار","خس","جواكامولي","صوص أولس"],en:["Sushi Rice","Grilled Shrimp","Pineapple","Broccoli","Crab","Cucumber","Lettuce","Guacamole","OLS Sauce"]},macros:{cal:490,protein:34,carbs:55,fat:14},available:true,hiddenUntil:null,order:3},
{id:"cheat-treat",category:"poke",cookType:"fry",image:"/images/cheat-treat.jpg",name:{ar:"تشيت تريت",en:"Cheat Treat"},description:{ar:"رز أبيض، دجاج مقلي بالبانكو، صوص الصويا، سمسم، ذرة، أفوكادو، طماطم كرزية، ملفوف ورمان",en:"White rice, panko fried chicken, soy sauce, sesame, corn, avocado, cherry tomatoes, cabbage and pomegranate"},price:32,priceLabel:null,allergens:["gluten","soy"],ingredients:{ar:["رز سوشي","دجاج مقلي","طماطم شيري","ملفوف","جواكامولي","جزر","خس","رمان","ذرة","صوص أولس"],en:["Sushi Rice","Fried Chicken","Cherry Tomatoes","Cabbage","Guacamole","Carrot","Lettuce","Pomegranate","Corn","OLS Sauce"]},macros:{cal:540,protein:30,carbs:62,fat:19},available:true,hiddenUntil:null,order:4},
{id:"grilled-gain",category:"poke",cookType:"grill",image:"/images/grilled-gain.jpg",name:{ar:"قين المشوي",en:"Grilled Gain"},description:{ar:"رز أبيض، دجاج مشوي، صوص الصويا، سمسم، ذرة، أفوكادو، ملفوف مشكل",en:"White rice, grilled chicken, soy sauce, sesame seeds, corn, avocado, mixed cabbage"},price:34,priceLabel:null,allergens:["soy"],ingredients:{ar:["رز سوشي","دجاج مشوي","خس","ملفوف الصويا","ذرة","جزر","رمان","خيار","جواكامولي","صوص أولس"],en:["Sushi Rice","Grilled Chicken","Lettuce","Soy Cabbage","Corn","Carrot","Pomegranate","Cucumber","Guacamole","OLS Sauce"]},macros:{cal:470,protein:36,carbs:52,fat:14},available:true,hiddenUntil:null,order:5},
{id:"salmon-crunch",category:"poke",cookType:"fry",image:"/images/salmon-crunch.jpg",name:{ar:"سالمون كرانش",en:"Salmon Crunch"},description:{ar:"رز أبيض، سالمون مقلي، بروكلي، أناناس، وخس",en:"White rice, fried salmon, broccoli, pineapple, and lettuce"},price:44,priceLabel:null,allergens:["fish","gluten"],ingredients:{ar:["رز سوشي","سالمون مقلي","بروكلي","أناناس","خس"],en:["Sushi Rice","Fried Salmon","Broccoli","Pineapple","Lettuce"]},macros:{cal:510,protein:38,carbs:48,fat:20},available:true,hiddenUntil:null,order:6},
{id:"buffalo-chicken",category:"protein",cookType:"fry",image:"/images/buffalo-chicken.jpg",name:{ar:"دجاج البافلو",en:"Buffalo Chicken"},description:{ar:"دجاج مقلي مقرمش بصوص بافلو أحمر على الأرز الأبيض بطعم جريء ولاذع",en:"Crispy fried chicken in red buffalo sauce over white rice for a bold, tangy crunch"},price:22,priceLabel:{ar:"يبدأ من",en:"From"},allergens:["gluten","dairy"],ingredients:{ar:["دجاج مقلي","صوص بافلو","ثوم","زيت زيتون","زبدة","توابل مشكلة"],en:["Fried Chicken","Buffalo Sauce","Garlic","Olive Oil","Butter","Mixed Spices"]},macros:{cal:450,protein:35,carbs:38,fat:18},available:true,hiddenUntil:null,order:1,weightOptions:{enabled:true,carb:{label:{ar:"أرز أبيض",en:"White Rice"},options:[{grams:100,price:5},{grams:150,price:7},{grams:200,price:9}]},protein:{label:{ar:"دجاج مقلي",en:"Fried Chicken"},options:[{grams:100,price:12},{grams:150,price:16},{grams:200,price:20}]}}},
{id:"lemon-chicken",category:"protein",cookType:"grill",image:"/images/lemon-chicken.jpg",name:{ar:"دجاج الليمون",en:"Lemon Chicken"},description:{ar:"دجاج بصوص ليمون خفيف على الأرز الأبيض بنكهة منعشة ومتوازنة",en:"Tender chicken in light lemon sauce over white rice for a refreshing, balanced flavor"},price:22,priceLabel:{ar:"يبدأ من",en:"From"},allergens:["dairy"],ingredients:{ar:["دجاج مشوي","عصير ليمون","زيت زيتون","ثوم","كريمة طهي","توابل مشكلة"],en:["Grilled Chicken","Lemon Juice","Olive Oil","Garlic","Cooking Cream","Mixed Spices"]},macros:{cal:420,protein:38,carbs:32,fat:16},available:true,hiddenUntil:null,order:2,weightOptions:{enabled:true,carb:{label:{ar:"أرز أبيض",en:"White Rice"},options:[{grams:100,price:5},{grams:150,price:7},{grams:200,price:9}]},protein:{label:{ar:"دجاج مشوي",en:"Grilled Chicken"},options:[{grams:100,price:12},{grams:150,price:16},{grams:200,price:20}]}}},
{id:"bbq-chicken",category:"protein",cookType:"grill",image:"/images/bbq-chicken.jpg",name:{ar:"دجاج الباربكيو",en:"BBQ Chicken"},description:{ar:"دجاج طري بصوص باربكيو غني على الأرز الأبيض بنكهة حلوة ومدخنة",en:"Juicy chicken in rich barbecue sauce over white rice with a sweet, smoky flavor"},price:22,priceLabel:{ar:"يبدأ من",en:"From"},allergens:[],ingredients:{ar:["دجاج مشوي","صوص باربكيو","ثوم","زيت زيتون","توابل مدخنة"],en:["Grilled Chicken","BBQ Sauce","Garlic","Olive Oil","Smoked Spices"]},macros:{cal:440,protein:36,carbs:42,fat:14},available:true,hiddenUntil:null,order:3,weightOptions:{enabled:true,carb:{label:{ar:"أرز أبيض",en:"White Rice"},options:[{grams:100,price:5},{grams:150,price:7},{grams:200,price:9}]},protein:{label:{ar:"دجاج مشوي",en:"Grilled Chicken"},options:[{grams:100,price:12},{grams:150,price:16},{grams:200,price:20}]}}},
{id:"mushroom-chicken",category:"protein",cookType:"grill",image:"/images/mushroom-chicken.jpg",name:{ar:"دجاج الفطر",en:"Mushroom Chicken"},description:{ar:"دجاج بصوص مشروم كريمي على الأرز الأبيض بطعم ناعم ومريح",en:"Chicken in creamy mushroom sauce over white rice for a smooth, comforting flavor"},price:22,priceLabel:{ar:"يبدأ من",en:"From"},allergens:["dairy","mushroom"],ingredients:{ar:["دجاج مشوي","فطر طازج","كريمة طهي","زيت زيتون","ثوم","توابل مشكلة"],en:["Grilled Chicken","Fresh Mushroom","Cooking Cream","Olive Oil","Garlic","Mixed Spices"]},macros:{cal:430,protein:37,carbs:30,fat:18},available:true,hiddenUntil:null,order:4,weightOptions:{enabled:true,carb:{label:{ar:"أرز أبيض",en:"White Rice"},options:[{grams:100,price:5},{grams:150,price:7},{grams:200,price:9}]},protein:{label:{ar:"دجاج مشوي",en:"Grilled Chicken"},options:[{grams:100,price:12},{grams:150,price:16},{grams:200,price:20}]}}},
{id:"tortilla-chicken",category:"tortilla",cookType:"grill",image:"/images/tortilla-chicken.jpg",name:{ar:"تورتيلا الدجاج",en:"Chicken Tortilla"},description:{ar:"دجاج مطهو مع فلفل بارد وتوابل خاصة وصوص محار ولمسة جبن ذائب. يحتوي على فطر",en:"Tender chicken sautéed with bell peppers, special spices, oyster sauce, and melted cheese. Contains mushrooms"},price:29,priceLabel:null,allergens:["gluten","dairy","mushroom"],ingredients:{ar:["دجاج","فطر","جبنة شيدر","جبنة موزاريلا","زيت زيتون","ثوم","فلفل رومي","توابل مشكلة","تورتيلا"],en:["Chicken","Mushroom","Cheddar","Mozzarella","Olive Oil","Garlic","Bell Pepper","Mixed Spices","Tortilla Wrap"]},macros:{cal:480,protein:34,carbs:38,fat:22},available:true,hiddenUntil:null,order:1},
{id:"tortilla-beef",category:"tortilla",cookType:"grill",image:"/images/tortilla-beef.jpg",name:{ar:"تورتيلا اللحم",en:"Beef Tortilla"},description:{ar:"تورتيلا لحم طري مع فلفل بارد وبهارات خاصة وصوص محار ولمسة جبن ذائب. يحتوي على فطر",en:"Juicy beef with bell peppers, special spices, oyster sauce, and melted cheese. Contains mushrooms"},price:33,priceLabel:null,allergens:["gluten","dairy","mushroom"],ingredients:{ar:["لحم بقري","فطر","جبنة شيدر","جبنة موزاريلا","زيت زيتون","ثوم","فلفل رومي","توابل مشكلة","تورتيلا"],en:["Beef","Mushroom","Cheddar","Mozzarella","Olive Oil","Garlic","Bell Pepper","Mixed Spices","Tortilla Wrap"]},macros:{cal:530,protein:38,carbs:36,fat:26},available:true,hiddenUntil:null,order:2},
{id:"tortilla-buffalo-chicken",category:"tortilla",cookType:"fry",image:"/images/tortilla-buffalo-chicken.jpg",name:{ar:"تورتيلا بافلو دجاج",en:"Buffalo Chicken Tortilla"},description:{ar:"تورتيلا محشية بدجاج البافلو الحار مع خس طازج وصلصة الرانش",en:"Tortilla wrap filled with buffalo chicken, fresh lettuce and ranch sauce"},price:32,priceLabel:null,allergens:["gluten","dairy"],ingredients:{ar:["دجاج مقلي","صوص بافلو","خس","رانش","تورتيلا"],en:["Fried Chicken","Buffalo Sauce","Lettuce","Ranch","Tortilla Wrap"]},macros:{cal:510,protein:30,carbs:42,fat:24},available:true,hiddenUntil:null,order:3},
{id:"tortilla-buffalo-shrimp",category:"tortilla",cookType:"fry",image:"/images/tortilla-buffalo-shrimp.jpg",name:{ar:"تورتيلا بافلو روبيان",en:"Buffalo Shrimp Tortilla"},description:{ar:"تورتيلا محشية بالروبيان البافلو الحار مع خس طازج وصلصة الرانش",en:"Tortilla wrap filled with buffalo shrimp, fresh lettuce and ranch sauce"},price:39,priceLabel:null,allergens:["gluten","seafood","dairy"],ingredients:{ar:["روبيان مقلي","صوص بافلو","خس","رانش","تورتيلا"],en:["Fried Shrimp","Buffalo Sauce","Lettuce","Ranch","Tortilla Wrap"]},macros:{cal:490,protein:28,carbs:40,fat:22},available:true,hiddenUntil:null,order:4},
{id:"shrimp-salad",category:"salad",cookType:"grill",image:"/images/shrimp-salad.jpg",name:{ar:"سلطة الروبيان",en:"Shrimp Light Salad"},description:{ar:"روبيان مشوي، خس، خيار، زيتون أسود، عصير ليمون",en:"Grilled shrimp, lettuce, cucumber, black olives, lemon juice"},price:34,priceLabel:null,allergens:["seafood"],ingredients:{ar:["روبيان مشوي","خس","خيار","زيتون أسود","عصير ليمون"],en:["Grilled Shrimp","Lettuce","Cucumber","Black Olives","Lemon Juice"]},macros:{cal:280,protein:30,carbs:12,fat:14},available:true,hiddenUntil:null,order:1},
{id:"crab-salad",category:"salad",cookType:"fry",image:"/images/crab-salad.jpg",name:{ar:"سلطة كرانش كراب",en:"Crab Crunch Salad"},description:{ar:"سلطة كراب كرانش بطبقات من خس مقرمش وخضار مبشورة ومزيج كراب كريمي ولمسة سيراتشا",en:"Fresh crab crunch salad with crisp lettuce, shredded veggies, creamy crab mix, and a hint of spicy sriracha"},price:32,priceLabel:null,allergens:["seafood","eggs"],ingredients:{ar:["كراب","خس","ملفوف","شمندر","جزر","خبز مقرمش","سيراتشا","مايونيز ياباني"],en:["Crab","Lettuce","Cabbage","Beetroot","Carrot","Crispy Bread","Sriracha","Japanese Mayo"]},macros:{cal:320,protein:22,carbs:18,fat:18},available:true,hiddenUntil:null,order:2}
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

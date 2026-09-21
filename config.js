// ==========================================
// SUPABASE CONFIGURATION
// ==========================================
var SUPABASE_URL = "https://mtqtuepfmobdbjoorwti.supabase.co"; // 👈 นำ URL จาก Supabase มาวาง
var SUPABASE_KEY = "sb_publishable_wCZYb_ahbzGMKJHl1rzh-A_OvkbYQm9";             // 👈 นำ Anon Key มาวาง

/**
 * ฟังก์ชัน Helper หลักสำหรับส่ง Request ไปยัง Supabase REST API
 */
function supabaseFetch(endpoint, method, payload, headers) {
  var url = SUPABASE_URL + '/rest/v1/' + endpoint;
  var reqHeaders = {
    'apikey': SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  if (headers) {
    for (var key in headers) {
      reqHeaders[key] = headers[key];
    }
  }

  var options = {
    method: method || 'GET',
    headers: reqHeaders,
    muteHttpExceptions: true
  };

  if (payload) {
    options.payload = JSON.stringify(payload);
  }

  var response = UrlFetchApp.fetch(url, options);
  var responseCode = response.getResponseCode();
  var content = response.getContentText();

  if (responseCode >= 200 && responseCode < 300) {
    return content ? JSON.parse(content) : [];
  } else {
    throw new Error('Supabase Error [' + responseCode + ']: ' + content);
  }
}

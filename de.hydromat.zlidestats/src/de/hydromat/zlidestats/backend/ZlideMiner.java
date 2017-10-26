package de.hydromat.zlidestats.backend;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import de.hydromat.zlidestats.sql.SqlManager;

public class ZlideMiner {
	public String clanTag;

	public ZlideMiner(String ClanTag) {
		this.clanTag = ClanTag;
	}

	public void takeSnapshot() {
		try {
			System.setProperty("http.agent", "");
			URL url = new URL("http://api.cr-api.com/clan/" + clanTag);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36");
			
			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
			String output;
			
			String allTogether = "";
			while ((output = br.readLine()) != null) {
				allTogether += output;
				System.out.println(output);
			}
			processSnapshot(allTogether);

			conn.disconnect();
		} catch (ProtocolException e) {
			e.printStackTrace();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void processSnapshot(String allTogether) {
		try {
			JSONObject obj = new JSONObject(allTogether);
			long date = System.currentTimeMillis();
			SqlManager.InsertClan(clanTag, date, obj.getString("name"), obj.getInt("memberCount"), obj.getInt("score"),
								  obj.getInt("requiredScore"), obj.getInt("donations"));

			JSONObject clanChestObj = obj.getJSONObject("clanChest");
			SqlManager.InsertClanChest(clanTag, date, clanChestObj.getInt("clanChestCrowns"), clanChestObj.getInt("clanChestCrownsRequired"));
			
			JSONArray clanMembers = obj.getJSONArray("members");
			for (int i = 0; i < clanMembers.length(); ++i) {
				JSONObject memberObj = clanMembers.getJSONObject(i);
				SqlManager.InsertClanMember(memberObj.getString("tag"), clanTag, date, memberObj.getString("name"), memberObj.getInt("expLevel"),
											memberObj.getInt("trophies"), memberObj.getInt("score"), memberObj.getInt("donations"),
											memberObj.getInt("clanChestCrowns"), memberObj.getString("roleName"));
			}
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
	}
}

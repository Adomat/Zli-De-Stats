package de.hydromat.zlidestats;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

public class MainThread implements Runnable {
	public static long threadTimeStamp;

	public static void main(String[] args) {
		(new MainThread()).run();
	}

	@Override
	public void run() {
		Console.logInfo("Neuer Thread gestartet", "");
		while (true) {
			try {
				if(System.currentTimeMillis() - threadTimeStamp < 1000) {
					// Sleep 5 Minutes cause this Thread restarted twice within the last second
					// and we don't want to spam anyone (Clash API or Telegram)
					Thread.sleep(1000 * 60 * 5);
				}
				else {
					updateDataBase();
					Thread.sleep(1000 * 60 * 60 * 8);
				}
			} catch (InterruptedException e) {
				Console.logError("Fehler im MainThread - starte neuen Thread", e.getMessage());

				(new MainThread()).run();
				return;
			} catch (IOException e) {
				Console.logError("Datenbank konnte nicht geupdatet werden", e.getMessage());
				try {
					updateDataBase();
				} catch (IOException e1) {
					Console.logError("Erneuter Versuch die Datenbank zu updaten fehlgeschlagen - starte neuen Thread", e.getMessage());
					(new MainThread()).run();
					return;
				}
			}
		}
	}
	
	private void updateDataBase() throws IOException {
		
		URL url = new URL("https://api.royaleapi.com/clan/2R92CURQ");
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("GET");
		con.setRequestProperty("auth", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYzNCwiaWRlbiI6IjI0MjMyODc0OTc4NDMwMTU2OSIsIm1kIjp7fSwidHMiOjE1MzYzMTQ4MTIwMzh9.pFFAJl83K8qteAVo1L2S6qAq0RKud3YGnedd6jlmUbE");
		
		int status = con.getResponseCode();
		
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		String content = "";
		
		while ((inputLine = in.readLine()) != null) {
			content += inputLine;
		}
		
		in.close();
		
		System.out.println(content);
			
		/*
		 * TODO sehr nice bisher, ich habe die ganzen try catch Blöcke ein bisschen aufgeräumt.
		 * -> In der variable content ist nun die http-response die vom clash server kommt
		 *    Darin sind alle unsere tollen Infos enthalten.
		 *    Folgende Seite hilft Dir, die Infos rauszuziehen:
		 *    
		 *        https://www.codexpedia.com/java/sample-code-for-parsing-json-string-in-java/
		 *    
		 */

		// Dies hier sind die (schon fertigen) Methoden, die deine erfragten Daten dann konsistent in einer
		// Datenbank abspeichern!
		
		DataBaseManager dbManager = new DataBaseManager();
		
		int clanTrophies = 0;
		
		String memberName = "Adomat";
		int memberTrophies = 4425;
		int memberDonationsDone = 894;
		int memberDonationsReceived = 687;
		
		dbManager.addNewClanEntry(clanTrophies);
		dbManager.addNewMemberEntry(memberName, memberTrophies, memberDonationsDone, memberDonationsReceived);
	}
}

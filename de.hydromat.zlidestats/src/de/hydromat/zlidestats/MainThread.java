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
				threadTimeStamp = System.currentTimeMillis();
				updateDataBase();
				Thread.sleep(1000 * 60 * 60 * 8);
			} catch (InterruptedException e) {
				Console.logError("Fehler im MainThread", e.getMessage());
				Console.logInfo("Starte neuen Thread", "");

				(new MainThread()).run();
				return;
			}
		}
	}
	
	private void updateDataBase() {
		DataBaseManager dbManager = new DataBaseManager();
		
		// TODO Nachfolgende Member ...
		int clanTrophies = 0;
		
		String memberName = "Adomat";
		int memberTrophies = 4425;
		int memberDonationsDone = 894;
		int memberDonationsReceived = 687;
		
		URL url = null;
		try {
			url = new URL("https://api.royaleapi.com/clan/2R92CURQ");
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		HttpURLConnection con = null;
		try {
			con = (HttpURLConnection) url.openConnection();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			con.setRequestMethod("GET");
		} catch (ProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		con.setRequestProperty("auth", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYzNCwiaWRlbiI6IjI0MjMyODc0OTc4NDMwMTU2OSIsIm1kIjp7fSwidHMiOjE1MzYzMTQ4MTIwMzh9.pFFAJl83K8qteAVo1L2S6qAq0RKud3YGnedd6jlmUbE");
		try {
			int status = con.getResponseCode();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		BufferedReader in;
		try {
			in = new BufferedReader(
					new InputStreamReader(con.getInputStream()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String inputLine;
		StringBuffer content = new StringBuffer();
		try {
			while ((inputLine = in.readLine()) != null) {
				content.append(inputLine);
			}
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try {
			in.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		
		
		/* Hier ist 1 Fehler drin, steht aber auch so im Netz, fix my shit.
			
		/*
		 * ... mit Werten füllen! Dafür die Clash Royale API anfragen und entsprechende Werte herausfinden!
		 * 
		 * Wie man HTTP Requests schickt zeigt diese Seite:
		 *     https://www.baeldung.com/java-http-request
		 * 
		 * Der Link für die Dokumentation zur Anfrage an die API, die Du hier brauchst ist:
		 *     https://docs.royaleapi.com/#/endpoints/clan
		 * 
		 * Danach hast Du einen String vorliegen, in dem alle unsere tollen Infos enthalten sind.
		 * Folgende Seite hilft Dir, die wichtigen Infos rauszuziehen:
		 *     https://www.codexpedia.com/java/sample-code-for-parsing-json-string-in-java/
		 */

		// Dies hier sind die (schon fertigen) Methoden, die deine erfragten Daten dann konsistent in einer
		// Datenbank abspeichern!
		dbManager.addNewClanEntry(clanTrophies);
		dbManager.addNewMemberEntry(memberName, memberTrophies, memberDonationsDone, memberDonationsReceived);
	}
}

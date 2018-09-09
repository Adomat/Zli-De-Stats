package de.hydromat.zlidestats;

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
				Console.logError("Fehler im MainThread, starte neuen Thread", e.getMessage());
				Console.logInfo("Starte neuen Thread", "");

				(new MainThread()).run();
				return;
			}
		}
	}
	
	private void updateDataBase() {
		DataBaseManager dbManager = new DataBaseManager();
		
		// Nachfolgende Member ...
		int clanTrophies = 0;
		
		String mamberName = "Adomat";
		int memberTrophies = 4424;
		int memberDonationsDone = 894;
		int memberDonationsReceived = 687;
		/*
		 * ... mit Werten f�llen! Daf�r die Clash Royale API anfragen und entsprechende Werte herausfinden!
		 * 
		 * Wie man HTTP Requests schickt zeigt diese Seite:
		 *     https://www.baeldung.com/java-http-request
		 * 
		 * Der Link f�r die Dokumentation zur Anfrage an die API, die Du hier brauchst ist:
		 *     https://docs.royaleapi.com/#/endpoints/clan
		 */

		// Dies hier sind die (schon fertigen) Methoden, die deine erfragten Daten dann konsistent in einer
		// Datenbank abspeichern!
		dbManager.addNewClanEntry(clanTrophies);
		dbManager.addNewMemberEntry(mamberName, memberTrophies, memberDonationsDone, memberDonationsReceived);
	}
}

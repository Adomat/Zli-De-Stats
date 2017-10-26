package de.hydromat.zlidestats.sql;

import java.sql.*;

public class SqlManager {
	private static Connection con;

	public static void connectToDatabase() {
		try {
			Class.forName("org.sqlite.JDBC");
			SqlManager.con = DriverManager.getConnection("jdbc:sqlite:stats.db");
		} catch (Exception e) {
			System.err.println("Hoppala... " + e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		}
		System.out.println("Opened database successfully");
	}

	public static void executeUpdate(String sqlStatement) {
		Statement stmt = null;

		try {
			stmt = SqlManager.con.createStatement();
			stmt.executeUpdate(sqlStatement);
			stmt.close();

			System.out.println("SQL-Update ausgeführt");
		} catch (SQLException e) {
			System.err.println("Hoppala... executeUpdate meldet Fehler in: " + e.getClass().getName() + ": " + e.getMessage());
		}
	}

	public static ResultSet executeQuery(String sqlStatement) {
		Statement stmt = null;

		try {
			stmt = SqlManager.con.createStatement();
			ResultSet rs = stmt.executeQuery(sqlStatement);
			// TODO stmt.close();

			System.out.println("SQL-Query ausgeführt");
			return rs;
		} catch (Exception e) {
			System.err.println("Hoppala... executeQuery meldet Fehler in: " + e.getClass().getName() + ": " + e.getMessage());
			return null;
		}
	}

	public static void disconnect() {
		try {
			SqlManager.con.close();
			System.out.println("Verbindung getrennt");
		} catch (SQLException e) {
			System.err.println("Hoppala... " + e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		}
	}

	public static void setupDataBase() {
		SqlManager.executeUpdate("CREATE TABLE CHARTERCOMPANY "
							+ "(ID INTEGER PRIMARY KEY,"
							+ " NAME TEXT NOT NULL, "
							+ " STREET TEXT, "
							+ " ZIP TEXT, "
							+ " CITY TEXT, "
							+ " TEL TEXT, "
							+ " FAX TEXT, "
							+ " EMAIL TEXT, "
							+ " HOMEPAGE TEXT, "
							+ " CUSTOMER_NR TEXT, "
							+ " BOOTSMANN TEXT, "
							+ " ADDITIONAL TEXT)");

		SqlManager.executeUpdate("CREATE TABLE SAILOR "
							+ "(ID INTEGER PRIMARY KEY, "
							+ " FIRSTNAME TEXT NOT NULL, "
							+ " LASTNAME TEXT NOT NULL, "
							+ " NATIONALITY TEXT, "
							+ " STREET TEXT, "
							+ " ZIP TEXT, "
							+ " CITY TEXT, "
							+ " TEL TEXT, "
							+ " MOBILE TEXT, "
							+ " FAX TEXT, "
							+ " EMAIL TEXT, "
							+ " EMERGENCY_NAME1 TEXT, "
							+ " EMERGENCY_NAME2 TEXT, "
							+ " EMERGENCY_PHONE1 TEXT, "
							+ " EMERGENCY_PHONE2 TEXT, "
							+ " ADDITIONAL TEXT)");

		SqlManager.executeUpdate("CREATE TABLE DOCUMENT "
							+ "(ID INTEGER PRIMARY KEY, "
							+ " NAME TEXT NOT NULL, "
							+ " OWNER INTEGER NOT NULL, "
							+ " DATE TEXT, "
							+ " ADDITIONAL TEXT, "
							
							+ " FOREIGN KEY (OWNER) REFERENCES SAILOR(ID) ON DELETE CASCADE)");

		SqlManager.executeUpdate("CREATE TABLE YACHT "
							+ "(ID INTEGER PRIMARY KEY, "
							+ " NAME TEXT NOT NULL, "
							+ " TYPE TEXT, "
							+ " MANUFACTURER TEXT, "
							+ " YEAR TEXT, "
							+ " KABINEN TEXT, "
							+ " KOJEN TEXT, "
							+ " MOTOR TEXT, "
							+ " MOTOR_PS TEXT, "
							+ " MOTOR_FUEL TEXT, "
							+ " MOTOR_TANKSIZE TEXT, "
							+ " MOTOR_COMMENT TEXT, "
							+ " WATER_TANKSIZE TEXT, "
							+ " DEPTH TEXT, "
							+ " RUFZEICHEN TEXT, "
							+ " MMSI TEXT, "
							+ " ADDITIONAL TEXT, "
							
							+ " CHARTERCOMPANY INTEGER NOT NULL, "
							+ " FOREIGN KEY (CHARTERCOMPANY) REFERENCES CHARTERCOMPANY(ID) ON DELETE NO ACTION)");

		SqlManager.executeUpdate("CREATE TABLE CREW "
							+ "(ID INTEGER PRIMARY KEY, "
							+ " STARTDATE TEXT NOT NULL, "
							+ " ENDDATE TEXT NOT NULL, "
							+ " STARTHARBOUR TEXT, "
							+ " ENDHARBOUR TEXT, "
							+ " CREWPHONE TEXT, "
							+ " ADDITIONAL TEXT, "
							
							+ " YACHT INTEGER NOT NULL, "
							+ " CHARTERCOMPANY INTEGER NOT NULL, "
							
							+ " FOREIGN KEY (YACHT) REFERENCES YACHT(ID) ON DELETE NO ACTION, "
							+ " FOREIGN KEY (CHARTERCOMPANY) REFERENCES CHARTERCOMPANY(ID) ON DELETE NO ACTION)");

		SqlManager.executeUpdate("CREATE TABLE SAILOR_IN_CREW "
							+ "(SAILOR INTEGER NOT NULL, "
							+ " CREW INTEGER NOT NULL, "
							
							+ " FOREIGN KEY (SAILOR) REFERENCES SAILOR(ID) ON DELETE CASCADE, "
							+ " FOREIGN KEY (CREW) REFERENCES CREW(ID) ON DELETE NO ACTION)");

		SqlManager.executeUpdate("CREATE TABLE BORDKASSE_ENTRY "
							+ "(ID INTEGER PRIMARY KEY, "
							+ " AMOUNT INTEGER NOT NULL, "
							+ " DATE TEXT NOT NULL, "
							+ " COMMENT TEXT, "
							
							+ " CREW INTEGER NOT NULL, "
							+ " SAILOR INTEGER NOT NULL, "
							
							+ " FOREIGN KEY (SAILOR) REFERENCES SAILOR(ID) ON DELETE CASCADE, "
							+ " FOREIGN KEY (CREW) REFERENCES CREW(ID) ON DELETE CASCADE)");
	}
}

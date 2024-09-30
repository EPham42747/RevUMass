import os
import shutil
import psycopg2
import pandas
from dotenv import load_dotenv

load_dotenv()
CSV_FOLDER = os.path.join(os.path.dirname(__file__), "data")
PROCESSED_FOLDER = os.path.join(os.path.dirname(__file__), "data/processed")

def connect_to_db():
    try:
        return psycopg2.connect(
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASS"),
            sslmode="require",
            options=f"endpoint={os.getenv("DB_ENDP")}"
        )
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None
    
def insert_csv(conn, csv_file, table_name):
    data_frame = pandas.read_csv(csv_file)

    with conn.cursor() as cursor:
        for _, row in data_frame.iterrows():
            columns = ", ".join(row.index)
            values = ", ".join([f"%s" for _ in row])
            insert_query = f"INSERT INTO {table_name} ({columns}) VALUES ({values});"
            cursor.execute(insert_query, tuple(row.values))

        conn.commit()

def ingest_csv_files():
    conn = connect_to_db()
    if not conn:
        return

    for file_name in os.listdir(CSV_FOLDER):
        if file_name.endswith(".csv"):
            csv_path = os.path.join(CSV_FOLDER, file_name)
            table_name = os.path.splitext(file_name)[0]

            insert_csv(conn, csv_path, table_name)

            dest_path = os.path.join(PROCESSED_FOLDER, file_name)
            shutil.move(csv_path, dest_path)

    conn.close()
    print("All CSV files ingested successfully.")

if __name__ == "__main__":
    ingest_csv_files()

import json

with open("dataset_reparacoes.json", "r", encoding="utf-8") as file:
    original_dataset = json.load(file)

works = original_dataset["reparacoes"]

clients = {}
vehicles = {}
operations = {}

for work in works:
    nif = work["nif"]
    vehicle_id = work["viatura"]["matricula"]
    work_date = work["data"]
    
    if nif not in clients:
        clients[nif] = {
            "name": work["nome"],
            "nif": nif,
            "repair_history": []
        }
    
    if vehicle_id not in vehicles:
        vehicles[vehicle_id] = {
            "brand": work["viatura"]["marca"],
            "model": work["viatura"]["modelo"],
            "license_plate": vehicle_id,
            "owners": set()
        }
    vehicles[vehicle_id]["owners"].add(nif)
    
    interventions = []
    for intervention in work["intervencoes"]:
        code = intervention["codigo"]
        if code not in operations:
            operations[code] = {
                "code": code,
                "name": intervention["nome"],
                "description": intervention["descricao"]
            }
        interventions.append(code)
    
    clients[nif]["repair_history"].append({
        "date": work_date,
        "vehicle": vehicle_id,
        "interventions": interventions
    })

for vehicle in vehicles.values():
    vehicle["owners"] = list(vehicle["owners"])

structured_data = {
    "clients": list(clients.values()),
    "vehicles": list(vehicles.values()),
    "operations": list(operations.values())
}

with open("new_dataset.json", "w", encoding="utf-8") as outfile:
    json.dump(structured_data, outfile, indent=4, ensure_ascii=False)

print("Data organization complete. Saved as new_dataset.json.")
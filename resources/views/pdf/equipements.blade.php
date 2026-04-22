<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Inventaire des Équipements OCP</title>
    <style>
        body { font-family: 'Helvetica', sans-serif; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #006B3F; padding-bottom: 10px; }
        .logo { color: #006B3F; font-size: 24px; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background-color: #006B3F; color: white; padding: 10px; text-align: left; font-size: 12px; }
        td { border: 1px solid #ddd; padding: 8px; font-size: 11px; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 10px; color: #777; border-top: 1px solid #ddd; padding-top: 5px; }
        .status { font-weight: bold; text-transform: uppercase; }
        .status-actif { color: #2dce89; }
        .status-maintenance { color: #fb6340; }
        .status-hors { color: #f5365c; }
    </style>
</head>
<body>
    <div className="header">
        <div className="logo">OCP ASSET MANAGEMENT</div>
        <p>Inventaire Global des Équipements IT - {{ date('d/m/Y') }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Série</th>
                <th>Marque / Modèle</th>
                <th>Site</th>
                <th>Type</th>
                <th>Statut</th>
            </tr>
        </thead>
        <tbody>
            @foreach($equipements as $equipement)
            <tr>
                <td>{{ $equipement->nom }}</td>
                <td>{{ $equipement->numero_serie }}</td>
                <td>{{ $equipement->marque }} {{ $equipement->modele }}</td>
                <td>{{ $equipement->site->nom ?? 'N/A' }}</td>
                <td>{{ $equipement->typeEquipement->nom ?? 'N/A' }}</td>
                <td className="status status-{{ Str::slug($equipement->statut) }}">{{ $equipement->statut }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div className="footer">
        © {{ date('Y') }} Groupe OCP - Document Confidentiel
    </div>
</body>
</html>

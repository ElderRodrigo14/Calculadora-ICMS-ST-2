// Versão Traduzida da Calculadora Inteligente ICMS-ST
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    
    // Inserindo a estrutura visual
    root.innerHTML = `
        <div style="font-family: sans-serif; background-color: #f4f4f5; min-height: 100vh; padding: 20px;">
            <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
                <h1 style="margin: 0; color: #18181b; font-size: 28px;">Calculadora Inteligente ICMS-ST</h1>
                <p style="color: #71717a; margin-top: 8px;">Cálculo em lote com precisão fiscal</p>
            </div>

            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 300px; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e4e4e7;">
                    <h3 style="margin-top: 0;">Entrada em Lote</h3>
                    <p style="font-size: 12px; color: #71717a;">Cole seus dados abaixo (NCM Valor IPI MVA)</p>
                    <textarea id="inputText" style="width: 100%; height: 200px; border: 1px solid #e4e4e7; border-radius: 4px; padding: 10px; font-family: monospace;" placeholder="Ex: 84818019 150.00 15.00 45.00"></textarea>
                    
                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                        <button id="btnLimpar" style="flex: 1; padding: 10px; background: white; border: 1px solid #e4e4e7; cursor: pointer; border-radius: 4px;">Limpar</button>
                        <button id="btnCalcular" style="flex: 1; padding: 10px; background: #2563eb; color: white; border: none; cursor: pointer; border-radius: 4px; font-weight: bold;">Calcular</button>
                    </div>
                </div>

                <div style="flex: 2; min-width: 300px; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e4e4e7;">
                    <h3 style="margin-top: 0;">Resultados</h3>
                    <div id="resultTable" style="width: 100%; overflow-x: auto;">
                        <p style="color: #71717a;">Aguardando cálculos...</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    const btnCalcular = document.getElementById('btnCalcular');
    const btnLimpar = document.getElementById('btnLimpar');
    const inputText = document.getElementById('inputText');
    const resultTable = document.getElementById('resultTable');

    // Lógica de Cálculo Simplificada (Baseada no seu código original)
    btnCalcular.addEventListener('click', () => {
        const lines = inputText.value.trim().split('\n');
        if (lines[0] === "") return;

        let html = `<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr style="background: #f8fafc; text-align: left; border-bottom: 2px solid #e2e8f0;">
                <th style="padding: 10px;">NCM</th>
                <th style="padding: 10px;">Valor</th>
                <th style="padding: 10px;">IPI</th>
                <th style="padding: 10px;">MVA%</th>
                <th style="padding: 10px;">ICMS ST</th>
            </tr>`;

        lines.forEach(line => {
            // Suporta espaço, tab ou pipe |
            const parts = line.split(/[\s\t|]+/).filter(p => p.trim() !== "");
            if (parts.length >= 2) {
                const ncm = parts[0];
                const valor = parseFloat(parts[1].replace(',', '.')) || 0;
                const ipi = parseFloat(parts[2]?.replace(',', '.')) || 0;
                const mva = parseFloat(parts[3]?.replace(',', '.')) || 40; // Default 40% se não informado
                
                // Cálculo Simulado (Base ST = (Valor + IPI) * (1 + MVA/100))
                const baseST = (valor + ipi) * (1 + (mva / 100));
                const icmsST = (baseST * 0.18) - (valor * 0.18); // Exemplo Alíquota 18%

                html += `<tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px;">${ncm}</td>
                    <td style="padding: 10px;">R$ ${valor.toFixed(2)}</td>
                    <td style="padding: 10px;">R$ ${ipi.toFixed(2)}</td>
                    <td style="padding: 10px;">${mva}%</td>
                    <td style="padding: 10px; font-weight: bold; color: #16a34a;">R$ ${icmsST.toFixed(2)}</td>
                </tr>`;
            }
        });

        html += `</table>`;
        resultTable.innerHTML = html;
    });

    btnLimpar.addEventListener('click', () => {
        inputText.value = "";
        resultTable.innerHTML = '<p style="color: #71717a;">Aguardando cálculos...</p>';
    });
});

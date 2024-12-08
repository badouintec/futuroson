document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar el SVG
    const svg = d3.select("#product-space");

    // Comprobar que el SVG existe
    if (!svg.empty()) {
        // Obtener las dimensiones del contenedor
        const container = document.querySelector(".graph-area");
        const width = container.getBoundingClientRect().width || 800;
        const height = container.getBoundingClientRect().height || 600;

        // Establecer ancho y alto del SVG
        svg.attr("width", width).attr("height", height);
        svg.attr("viewBox", `0 0 ${width} ${height}`);

        // Crear grupo principal
        const g = svg.append("g");

        // Definir escalas y simulación
        // Datos iniciales
        const data = {
            "nodes": [
                {"id": "Agricultural Goods", "group": 1, "value": 100, "category": "Agricultural"},
                {"id": "Construction Goods", "group": 2, "value": 80, "category": "Construction"},
                {"id": "Electronics", "group": 3, "value": 150, "category": "Electronics"},
                {"id": "Apparel", "group": 4, "value": 60, "category": "Apparel"},
                {"id": "Automobiles", "group": 5, "value": 120, "category": "Automobiles"},
                {"id": "Pharmaceuticals", "group": 6, "value": 90, "category": "Pharmaceuticals"},
                // Agregar más nodos según sea necesario
            ],
            "links": [
                {"source": "Agricultural Goods", "target": "Construction Goods", "value": 1},
                {"source": "Construction Goods", "target": "Electronics", "value": 1},
                {"source": "Electronics", "target": "Agricultural Goods", "value": 1},
                {"source": "Apparel", "target": "Electronics", "value": 1},
                {"source": "Automobiles", "target": "Electronics", "value": 1},
                {"source": "Pharmaceuticals", "target": "Electronics", "value": 1},
                // Agregar más enlaces según sea necesario
            ]
        };

        // Definir escalas de color
        const colorScale = d3.scaleOrdinal()
            .domain(["Agricultural", "Construction", "Electronics", "Apparel", "Automobiles", "Pharmaceuticals"])
            .range(["#f1c40f", "#8e44ad", "#2980b9", "#27ae60", "#e67e22", "#d35400"]); // Colores representativos

        // Definir escalas de tamaño
        const sizeScale = d3.scaleSqrt()
            .domain([0, d3.max(data.nodes, d => d.value)])
            .range([5, 30]); // Radio mínimo y máximo

        // Crear grupo principal para aplicar transformaciones (zoom y drag)
        const g = svg.append("g");

        // Definir simulación de fuerzas
        const simulation = d3.forceSimulation(data.nodes)
            .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(d => sizeScale(d.value) + 20))
            .on("tick", ticked);

        // Crear enlaces (líneas)
        const link = g.selectAll(".link")
            .data(data.links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("stroke-width", d => Math.sqrt(d.value))
            .attr("stroke", "#bdc3c7")
            .attr("stroke-opacity", 0.6);

        // Crear nodos (círculos)
        const node = g.selectAll(".node")
            .data(data.nodes)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", d => sizeScale(d.value))
            .attr("fill", d => colorScale(d.category))
            .attr("stroke", d => (d.value < 50 ? "lightgray" : "#ffffff"))
            .attr("stroke-width", 1.5)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("click", handleClick)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            );

        // Agregar etiquetas a los nodos
        const labels = g.selectAll(".node-label")
            .data(data.nodes)
            .enter()
            .append("text")
            .attr("class", "node-label")
            .attr("dx", 0)
            .attr("dy", d => -sizeScale(d.value) - 5)
            .text(d => d.id);

        // Opcional: Añadir etiquetas a nodos destacados
        node.append("title")
            .text(d => d.id);

        // Función de actualización en cada tick de la simulación
        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            labels
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        }

        // Tooltip
        const tooltip = d3.select("#tooltip");

        // Mejorar la función de manejo de eventos del tooltip
        function handleMouseOver(event, d) {
            tooltip.style("opacity", 1)
                .html(`
                    <strong>Producto:</strong> ${d.id}<br/>
                    <strong>Categoría:</strong> ${d.category}<br/>
                    <strong>Valor de Exportación:</strong> $${d.value}B
                `)
                .style("left", `${event.pageX + 15}px`)
                .style("top", `${event.pageY - 28}px`);
        }

        function handleMouseOut(event, d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        }

        // Modal
        const modal = document.getElementById("modal");
        const modalTitle = document.getElementById("modal-title");
        const modalBody = document.getElementById("modal-body");
        const modalClose = document.getElementById("modal-close");

        // Manejo de eventos de clic para mostrar modal con gráfico y tabla
        function handleClick(event, d) {
            modalTitle.textContent = "Most Related Nearby Products";
            // Filtrar enlaces relacionados
            const relatedLinks = data.links.filter(link => link.source.id === d.id || link.target.id === d.id);
            // Obtener productos relacionados
            const relatedProducts = relatedLinks.map(link => {
                return link.source.id === d.id ? link.target : link.source;
            });
            // Generar gráfico dentro del modal
            generateModalGraph(d, relatedProducts);
            // Generar tabla dentro del modal
            generateModalTable(relatedProducts);
            // Mostrar el modal
            modal.style.display = "flex";
        }

        // Función para generar el gráfico circular dentro del modal
        function generateModalGraph(selectedNode, relatedProducts) {
            const svg = d3.select("#modal-graph");
            svg.selectAll("*").remove(); // Limpiar gráfico anterior

            const width = +svg.attr("width");
            const height = +svg.attr("height");
            const radius = Math.min(width, height) / 2;

            const g = svg.append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`);

            const pie = d3.pie()
                .value(() => 1);

            const arc = d3.arc()
                .innerRadius(radius * 0.5)
                .outerRadius(radius);

            const pieData = pie(relatedProducts);

            const color = d3.scaleOrdinal(d3.schemeCategory10);

            g.selectAll(".arc")
                .data(pieData)
                .enter()
                .append("path")
                .attr("class", "arc")
                .attr("d", arc)
                .attr("fill", (d, i) => color(i));

            // Añadir etiquetas
            g.selectAll(".label")
                .data(pieData)
                .enter()
                .append("text")
                .attr("transform", d => `translate(${arc.centroid(d)})`)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(d => d.data.id);
        }

        // Refactorizar la función generateModalTable
        function generateModalTable(relatedProducts) {
            const tableBody = document.getElementById("modal-table-body");
            tableBody.innerHTML = relatedProducts.map(product => `
                <tr>
                    <td>${product.id}</td>
                    <td>${Math.floor(Math.random() * 10) + 1}</td>
                    <td><span class="star-rating">${'★'.repeat(Math.floor(Math.random() * 5) + 1)}</span></td>
                </tr>
            `).join('');
        }

        // Unificar eventos para cerrar el modal
        function closeModal() {
            modal.style.display = "none";
        }

        modalClose.addEventListener('click', closeModal);
        window.addEventListener('click', event => {
            if (event.target === modal) {
                closeModal();
            }
        }

        // Funciones de drag and drop
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // Zoom y Pan
        const zoom = d3.zoom()
            .scaleExtent([0.5, 5])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoom);

        // Controles de Zoom
        document.getElementById("zoom-in").addEventListener("click", () => {
            zoom.scaleBy(svg.transition().duration(500), 1.2);
        });

        document.getElementById("zoom-out").addEventListener("click", () => {
            zoom.scaleBy(svg.transition().duration(500), 0.8);
        });

        document.getElementById("zoom-reset").addEventListener("click", () => {
            svg.transition().duration(500).call(
                zoom.transform,
                d3.zoomIdentity
            );
        });

        // Botón de descarga (Descargar datos en CSV)
        document.querySelector(".sidebar__download").addEventListener("click", () => {
            const csvContent = "data:text/csv;charset=utf-8,"
                + "id,group,value,category\n"
                + data.nodes.map(d => `${d.id},${d.group},${d.value},${d.category}`).join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "export_data.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        // Ajustar el tamaño del SVG al cambiar el tamaño de la ventana
        window.addEventListener("resize", () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            svg.attr("width", newWidth).attr("height", newHeight);
            svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);
            simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
            simulation.alpha(0.3).restart();
        });
    } else {
        console.error("SVG con id 'product-space' no encontrado.");
    }

    // Ajustar el tamaño al cambiar la ventana
    window.addEventListener("resize", () => {
        const newWidth = container.getBoundingClientRect().width;
        const newHeight = container.getBoundingClientRect().height;
        svg.attr("width", newWidth).attr("height", newHeight);
        svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);
        simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
        simulation.alpha(0.3).restart();
    });
});
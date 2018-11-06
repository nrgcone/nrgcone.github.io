(function(){
    document.getElementById('btnConvert').addEventListener('click', function(){
        //alert('Hello!')
        var inputData = document.getElementById('inputTxt').value;
        inputData = inputData.toUpperCase();
        var count = 0;
        var lines = [];
        var perenos = [];

        function calculateMolarMass(N, K, M){
            //return (N * 12 + K + M * 16) * 1e-3;
            return N * 12 + K + M * 16; //г / моль
        }

        function calculateReaction(_mass, _n, _m, _k){
            //C_nH_mO_k + xC -> yCO + zH2
            var mu_input = calculateMolarMass(_n, _m, _k);
            var x = _k - _n;
            var y = _k;
            var z = _m / 2.0;
            /*var result = 'C' + _n + 'H' + _m + 'O' + _k + ';+;';
            result += (_k - _n) + ';C;->;';
            result += _k + ';CO;+;';
            result += _m / 2.0 + ';H2';*/
            return {
                x,
                y,
                z,
                m_C: _mass * x * 12 / mu_input,
                m_CO: _mass * y * 28 / mu_input,
                m_H2: _mass * z * 2 / mu_input
            };
        }

        function processCompound(inputLine){
            var indexC = inputLine.indexOf('C');
            var n = 0;
            var indexH = inputLine.indexOf('H');
            var m = 0;
            var indexO = inputLine.indexOf('O');
            var k = 0;
            //alert(inputLine.length + ':' + indexC + ';' + indexH + ';' + indexO);
            //CnHmOk
            if (indexC >=0 && indexH >= 0 && indexO >=0){
                if (indexO == inputLine.length - 1){
                    k = 1;
                } else {
                    k = +inputLine.slice(indexO + 1);
                }
                if (indexO - indexH == 1){
                    m = 1;
                } else {
                    m = +inputLine.slice(indexH + 1, indexO);
                }
                if (indexH - indexC == 1){
                    n = 1;
                } else {
                    n = inputLine.slice(indexC + 1, indexH);
                }
            }
            //CnHm
            if (indexC >= 0 && indexH >= 0 && indexO < 0){
                if (indexH == inputLine.length - 1){
                    m = 1;
                } else {
                    m = +inputLine.slice(indexH + 1);
                }
                if (indexH - indexC == 1){
                    n = 1;
                } else {
                    n = +inputLine.slice(indexC + 1, indexH);
                }
            }
            //CnOk
            if (indexC >= 0 && indexH < 0 && indexO >= 0){
                if (indexO == inputLine.length - 1) {
                    k = 1;
                } else {
                    k = +inputLine.slice(indexO + 1);
                }
                if (indexO - indexC == 1){
                    n = 1;
                } else {
                    n = +inputLine.slice(indexC + 1, indexO);
                }
            }
            //HmOk
            if (indexC < 0 && indexH >= 0 && indexO >= 0){
                if (indexO == inputLine.length - 1) {
                    k = 1;
                } else {
                    k = +inputLine.slice(indexO + 1);
                }
                if (indexO - indexH == 1){
                    m = 1;
                } else {
                    m = +inputLine.slice(indexH + 1, indexO);
                }
            }
            //Cn
            if (indexC >= 0 && indexH < 0 && indexO < 0){
                if (indexC == inputLine.length - 1){
                    n = 1;
                } else {
                    n = +inputLine.slice(indexC + 1);
                }
            }
            //Hm
            if (indexC < 0 && indexH >= 0 && indexO < 0){
                if (indexH == inputLine.length - 1){
                    m = 1;
                } else {
                    m = +inputLine.slice(indexH + 1);
                }
            }
            //Ok
            if (indexC < 0 && indexH < 0 && indexO >= 0){
                if (indexO == inputLine.length - 1){
                    k = 1;
                } else {
                    k = +inputLine.slice(indexO + 1);
                }
            }
            var result = [];
            result.push(n);
            result.push(m);
            result.push(k);
            return result;
            /*
            if (indexC >= 0){
                if (indexH >= 0){
                    if (indexO >= 0){
                        //CnHmOk
                        if (indexO == inputLine.length - 1){
                            k = 1;
                        } else {
                            k = +inputLine.slice(indexO + 1, inputLine.length)
                        }
                        if (indexO - indexH == 1){
                            m = 1;
                        } else {
                            m = +inputLine.slice(indexH + 1, indexO);
                        }
                        if (indexH - indexC == 1){
                            n = 1;
                        } else {
                            n = +inputLineslice(indexC + 1, indexH);
                        }
                    } else {
                        //CnHm
                        if (indexH == inputLine.length - 1){
                            m = 1;
                        } else {
                            m = +inputLine.slice(indexH + 1, inputLine.length)
                        }
                        if (indexH - indexC == 1){
                            n = 1;
                        } else {
                            n = +inputLineslice(indexC + 1, indexH);
                        }
                    }
                } else {
                    //CnOk
                    if (indexO == inputLine.length - 1){
                        k = 1;
                    } else {
                        k = +inputLine.slice(indexO + 1, inputLine.length)
                    }
                    if (indexO - indexC == 1){
                        n = 1;
                    } else {
                        n = +inputLineslice(indexC + 1, indexO);
                    }
                }
            }*/
            
        }

        function processLine(inputLine){
            var result = []
            var i = 0
            while (inputLine[i] != ';'){
                i += 1;
            }
            result.push(inputLine.slice(0, i));
            result.push(inputLine.slice(i + 1, inputLine.length));
            indexOfComma = result[0].indexOf(',');
            if (indexOfComma > 0){
                result[0] = result[0].slice(0, indexOfComma) + '.' + result[0].slice(indexOfComma + 1)
            }
            //alert(+result[0] + '; ' + result[1]);
            var coeff = processCompound(result[1]);
            var data = calculateReaction(+result[0], coeff[0], coeff[1], coeff[2])
            var equation = result[1] + '';
            if (data.x > 0){
                if (data.x == 1){
                    equation += (' + C -> ');
                } else {
                    equation += (' + ' + data.x + ' C -> ');
                }
            } else {
                equation += ' -> ';
                if (data.x != 0){
                    if (data.x == -1){
                        equation += ' C + ';
                    } else {
                        equation += (-data.x + ' C + ');
                    }
                }
            }
            if (data.y == 1){
                equation += (' CO');
            } else {
                equation += (data.y + ' CO');
            }
            if (data.z != 0){
                if (data.z == 1){
                    equation += (' + H2');
                } else {
                    equation += (' + ' + data.z + ' H2'); 
                }
            }    
            //alert(equation);
            return {
                name: result[1],
                eq: equation,
                mass: result[0],
                m_C: data.m_C,
                m_CO: data.m_CO,
                m_H2: data.m_H2
            };
        }


        if (inputData.length == 0){
            alert('Please, input some compounds.')
        } else {
            count += 1;
            var beginning = 0;
            for (var i = 0; i < inputData.length - 1; i++){
                //if (inputData.slice(i, i + 1) == '\n'){
                if (inputData[i] == '\n'){
                    count++;
                    //alert(inputData[i + 1]);
                    perenos.push(i);
                    //alert(beginning + ':' + (i - 1));
                    //alert(inputData.slice(beginning, i - 1));
                    //lines.push(inputData.slice(beginning, i));
                    beginning = i + 1;
                }
            }
            lines.push(inputData.slice(0, perenos[0]));
            for (var i = 1; i < perenos.length; i++){
                lines.push(inputData.slice(perenos[i - 1] + 1, perenos[i]))
            }
            if (perenos[perenos.length - 1] < inputData.length){
                lines.push(inputData.slice(perenos[perenos.length - 1] + 1, inputData.length + 1));
            }
        }
        var tempString = 'Compound;Equation;Compound mass;C mass;CO mass; H2 mass\n';
        //var tempString = '';
        var C_mass = 0.0;
        var CO_mass = 0.0;
        var H2_mass = 0.0;
        var Compounds_mass = 0.0;
        for (var i = 0; i < lines.length; i++){
            var c = processLine(lines[i]);
            C_mass += c.m_C;
            CO_mass += c.m_CO;
            H2_mass += c.m_H2;
            Compounds_mass += +c.mass;
            tempString += (c.name + ';' + c.eq + ';' + c.mass + ';' + c.m_C + ';' + c.m_CO + ';' + c.m_H2 + '\n');
        }
        tempString += (';total;' + Compounds_mass + ';' + C_mass + ';' + CO_mass + ';' + H2_mass);
        var resultString = ''
        for (var i = 0; i < tempString.length; i++){
            if (tempString[i] == '.'){
                resultString += ',';
            } else {
                resultString += tempString[i]
            }
        }
        document.getElementById('outputTxt').value = resultString;
        //document.getElementById('outputTxt').value = 'Compound;Equation;Compound mass;C mass;CO mass; H2 mass\n';
        //document.getElementById('outputTxt').value += tempString;
        //document.getElementById('outputTxt').value += (';total;' + Compounds_mass + ';' + C_mass + ';' + CO_mass + ';' + H2_mass);
        
        //document.getElementById('outputTxt').value += (';total;' + C_mass + ';' + CO_mass + ';' + H2_mass);
        //alert(lines[0]);
    });
})();
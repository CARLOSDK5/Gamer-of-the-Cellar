// Sistema de tradução com API para jogo de escolhas
let isTranslated = false;
let originalTexts = {}; // Cache dos textos originais

// Função para traduzir texto usando API
async function translateTextAPI(text, fromLang = 'pt', toLang = 'en') {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`);
        const data = await response.json();
        
        if (data.responseStatus === 200) {
            return data.responseData.translatedText;
        }
        return text; // Retorna texto original se falhar
    } catch (error) {
        console.error('Erro na tradução:', error);
        return text;
    }
}

// Função para coletar e armazenar textos originais
function cacheOriginalTexts() {
    const elements = [
        // LGPD
        { id: 'lgpd-content', selector: 'h2' },
        { id: 'lgpd-content', selector: 'p' },
        { id: 'lgpd-content', selector: 'button' },
        
        // Intro
        { id: 'press-start' },
        
        // Dialog text será tratado separadamente pois muda dinamicamente
        { id: 'dialog-text' },
        
        // Personagens
        { id: 'char-name' },
        { id: 'char-desc' },
        
        // Controles
        '.controls button'
    ];

    elements.forEach(elem => {
        if (elem.selector) {
            const parent = document.getElementById(elem.id);
            if (parent) {
                const child = parent.querySelector(elem.selector);
                if (child && child.textContent.trim()) {
                    const key = `${elem.id}_${elem.selector}`;
                    originalTexts[key] = child.textContent.trim();
                }
            }
        } else if (elem.id) {
            const element = document.getElementById(elem.id);
            if (element && element.textContent.trim()) {
                originalTexts[elem.id] = element.textContent.trim();
            }
        } else {
            const elements = document.querySelectorAll(elem);
            elements.forEach((el, index) => {
                if (el.textContent.trim()) {
                    originalTexts[`${elem}_${index}`] = el.textContent.trim();
                }
            });
        }
    });
    
    // Cache do botão de traduzir
    originalTexts['button-translate'] = document.getElementById('button-translate').textContent;
}

// Função para traduzir elemento específico
async function translateElement(elementId, selector = null) {
    let element;
    let cacheKey;
    
    if (selector) {
        const parent = document.getElementById(elementId);
        element = parent ? parent.querySelector(selector) : null;
        cacheKey = `${elementId}_${selector}`;
    } else {
        element = document.getElementById(elementId);
        cacheKey = elementId;
    }
    
    if (!element) return;
    
    if (isTranslated) {
        // Restaurar texto original
        if (originalTexts[cacheKey]) {
            element.textContent = originalTexts[cacheKey];
        }
    } else {
        // Traduzir para inglês
        const originalText = element.textContent.trim();
        if (originalText) {
            const translatedText = await translateTextAPI(originalText, 'pt', 'en');
            element.textContent = translatedText;
        }
    }
}

// Função para traduzir os diálogos do jogo
function translateDialogs() {
    if (isTranslated) {
        // Restaurar diálogos originais
        dialogs.forEach((dialog, index) => {
            if (dialog.originalText) {
                dialog.text = dialog.originalText;
            }
        });
    } else {
        // Traduzir diálogos
        dialogs.forEach(async (dialog, index) => {
            if (!dialog.originalText) {
                dialog.originalText = dialog.text; // Salvar original
            }
            dialog.text = await translateTextAPI(dialog.text, 'pt', 'en');
        });
    }
}

// Função para traduzir personagens
function translateCharacters() {
    if (isTranslated) {
        // Restaurar personagens originais
        characters.forEach(char => {
            if (char.originalDesc) {
                char.desc = char.originalDesc;
            }
        });
    } else {
        // Traduzir descrições dos personagens
        characters.forEach(async char => {
            if (!char.originalDesc) {
                char.originalDesc = char.desc; // Salvar original
            }
            char.desc = await translateTextAPI(char.desc, 'pt', 'en');
        });
    }
    
    // Atualizar personagem atual se estiver na tela de seleção
    if (document.getElementById('choice-box').style.display !== 'none') {
        setTimeout(() => updateCharacter(), 100);
    }
}

// Função principal de tradução
async function translatePage() {
    const translateButton = document.getElementById('button-translate');
    
    // Mostrar loading
    translateButton.textContent = isTranslated ? 'Traduzindo...' : 'Translating...';
    translateButton.disabled = true;
    
    try {
        if (!isTranslated) {
            // Cache textos originais antes da primeira tradução
            if (Object.keys(originalTexts).length === 0) {
                cacheOriginalTexts();
            }
        }
        
        // Traduzir elementos da interface
        await Promise.all([
            // LGPD
            translateElement('lgpd-content', 'h2'),
            translateElement('lgpd-content', 'p'),
            translateElement('lgpd-content', 'button'),
            
            // Intro
            translateElement('press-start'),
            
            // Personagem atual
            translateElement('char-desc')
        ]);
        
        // Traduzir arrays de dados
        translateDialogs();
        translateCharacters();
        
        // Alternar estado
        isTranslated = !isTranslated;
        
        // Atualizar botão
        translateButton.textContent = isTranslated ? 'Português' : 'English';
        
        // Se estiver no diálogo, retraduzir o texto atual
        const dialogText = document.getElementById('dialog-text');
        if (dialogText && dialogText.textContent && dialogIndex > 0) {
            const currentDialog = dialogs[dialogIndex - 1];
            if (currentDialog) {
                dialogText.textContent = currentDialog.text;
            }
        }
        
    } catch (error) {
        console.error('Erro na tradução:', error);
        alert(isTranslated ? 'Translation error!' : 'Erro na tradução!');
    } finally {
        translateButton.disabled = false;
    }
}

// Event listener para o botão de tradução
document.addEventListener('DOMContentLoaded', function() {
    const translateButton = document.getElementById('button-translate');
    if (translateButton) {
        translateButton.addEventListener('click', translatePage);
    }
});

// Função auxiliar para traduzir alertas dinâmicos
async function translateAlert(message) {
    if (isTranslated) {
        return await translateTextAPI(message, 'pt', 'en');
    }
    return message;
}

// Profile Adapter V1 (no weighting) - adapts narrative/phrasing only
module.exports = {
  adaptProfile: function(profile) {
    const valid = ["Empresário","Profissional Liberal","Executivo/Gestor","Colaborador/Especialista","Empreendedor em formação"];
    if (!profile || valid.indexOf(profile) === -1) return null;
    return profile;
  }
};
